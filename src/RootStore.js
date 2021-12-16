import { types, flow, tryReference } from "mobx-state-tree";
import { sortBy } from "lodash";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import React from "react";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  addDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// create a type used by your RootStore
const Channel = types.model("Channel", {
  id: types.identifier,
  name: types.string,
});

const User = types.model("User", {
  uid: types.identifier,
  username: types.string,
})

const Message = types.model("Message", {
  id: types.identifier,
  uid: types.reference(User),
  time: types.number,
  text: types.string,
}).views(self => ({
  get username() {
    const maybeValidUserRef = tryReference(() => self.uid);
    if (maybeValidUserRef) {
      return maybeValidUserRef.username;
    }
    return self.uid;
  }
}));

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    channels: types.optional(types.array(Channel), []),
    isLoggedIn: types.optional(types.boolean, false), // set to true for now since we don't really have login sessions yet
    user: types.frozen(),
    isLoading: types.optional(types.boolean, false),
    loginError: types.frozen(),
    messages: types.optional(types.array(Message), []),
    users: types.optional(types.array(User), [])
  })
  .views((self) => ({
    get channelsSorted() {
      return sortBy(self.channels, (c) => c.id);
    },
    get username() {
      const user = self.users.find(u => u.uid === self.user.uid);
      if (user) {
        return user.username;
      }
      return self.user.uid;
    }
  }))
  .actions((self) => {
    const afterCreate = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          self.setIsLoggedIn(true, user);
        } else {
          self.setIsLoggedIn(false, null);
        }
      });
    };

    // *** streaming functions ***

    // channels
    let unsubscribeFromChannelsFeed; // we could later use this to tear down on logout... or something
    const startStreamingChannels = () => {
      const db = getFirestore();
      const q = query(collection(db, "channels"));
      unsubscribeFromChannelsFeed = onSnapshot(q, (querySnapshot) => {
        self.updateChannels(querySnapshot);
      });
    };

    const stopStreamingChannels = () => {
      unsubscribeFromChannelsFeed();
    };

    const updateChannels = (querySnapshot) => {
      self.channels = [];
      querySnapshot.forEach((doc) => {
        self.channels.push({ id: doc.id, name: doc.data().name });
      });
    };

    // messages
    let unsubscribeFromChannelMessagesFeed; // we could later use this to tear down on logout... or something
    const startStreamingChannelMessages = (channelId) => {
      const db = getFirestore();
      const q = query(
        collection(doc(collection(db, "channels"), channelId), "messages")
      );
      unsubscribeFromChannelMessagesFeed = onSnapshot(q, (querySnapshot) => {
        self.updateMessages(querySnapshot);
      });
    };

    const stopStreamingCurrentChannel = () => {
      self.messages = [];
      unsubscribeFromChannelMessagesFeed();
    };

    const updateMessages = (querySnapshot) => {
      self.messages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        self.messages.push({
          id: doc.id,
          uid: data.uid,
          // when message is added locally before upload, time is null because it will
          // later be set by the server
          time: data.time ? data.time.seconds * 1000 : new Date().getTime(),
          text: data.text,
        });
      });
    };

    // users
    let unsubscribeFromUsersFeed; // we could later use this to tear down on logout... or something
    const startStreamingUsers = () => {
      const db = getFirestore();
      const q = query(
        collection(db, "users")
      );
      unsubscribeFromUsersFeed = onSnapshot(q, (querySnapshot) => {
        self.updateUsers(querySnapshot);
      });
    };

    const stopStreamingUsers = () => {
      self.users = [];
      if (unsubscribeFromUsersFeed) {
        unsubscribeFromUsersFeed();
      }
    };

    const updateUsers = (querySnapshot) => {
      self.users = [];
      querySnapshot.forEach((doc) => {
        self.users.push({ uid: doc.id, username: doc.data().username });
      });
    };

    // *** end streaming functions ***

    const addChannel = flow(function* addChannel() {
      const db = getFirestore();
      // add new document with auto-id
      yield addDoc(collection(db, "channels"), {
        name: uniqueNamesGenerator({
          dictionaries: [adjectives, animals],
          length: 2,
          separator: "-",
        }) /* names like: "awesome-ocelot" */,
      });
    });

    const updateUsername = flow(function* updateUsername(newUsername){
      const db = getFirestore();
      yield setDoc(doc(db, "users", self.user.uid), { username: newUsername });
    })

    const sendMessage = flow(function* sendMessage({ text, channelId }) {
      const db = getFirestore();
      // add new document with auto-id
      yield addDoc(
        collection(doc(collection(db, "channels"), channelId), "messages"),
        {
          text,
          time: serverTimestamp(),
          username: self.user.email,
          uid: self.user.uid,
        }
      );
    });

    const login = flow(function* login({ username, password }) {
      const auth = getAuth();
      try {
        self.isLoading = true;
        const user = yield signInWithEmailAndPassword(auth, username, password);
        self.isLoggedIn = true;
        self.loginError = null;
        console.log(user);
      } catch (error) {
        self.loginError = error;
        console.log(error);
      } finally {
        self.isLoading = false;
      }
    });

    const logout = flow(function* logout() {
      const auth = getAuth();
      try {
        yield signOut(auth);
        self.isLoggedIn = false;
      } catch (error) {
        // eh?
      }
    });

    const setIsLoggedIn = flow(function* setIsLoggedIn(isLoggedIn, user) {
      self.isLoggedIn = isLoggedIn;
      self.user = user;
      if (isLoggedIn) {
        self.startStreamingUsers();
        try {
          const docSnapshot = yield getDoc(doc(getFirestore(), "users", user.uid));
          if (!docSnapshot.exists()) {
            self.updateUsername(user.email);
          }
        } catch (error) {}
      } else {
        self.stopStreamingUsers();
      }
    });

    const setIsLoading = (isLoading) => {
      self.isLoading = isLoading;
    };

    return {
      afterCreate,
      addChannel,
      login,
      logout,
      startStreamingChannels,
      stopStreamingChannels,
      startStreamingChannelMessages,
      stopStreamingCurrentChannel,
      startStreamingUsers,
      stopStreamingUsers,
      updateChannels,
      updateMessages,
      updateUsers,
      setIsLoggedIn,
      setIsLoading,
      sendMessage,
      updateUsername,
    };
  });

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = RootStore.create({});
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // not likely, but sure
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
