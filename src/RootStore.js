import { types, flow } from "mobx-state-tree";
import { sortBy } from "lodash";
import React from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  addDoc,
  doc, // use me when adding a new chat message
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

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    channels: types.optional(types.array(Channel), []),
    isLoggedIn: types.optional(types.boolean, false), // set to true for now since we don't really have login sessions yet
    user: types.frozen(),
    isLoading: types.optional(types.boolean, false),
    loginError: types.frozen(),
  })
  .views((self) => ({
    get channelsSorted() {
      return sortBy(self.channels, (c) => c.id);
    },
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

    let unsubscribeFromChannelsFeed; // we could later use this to tear down on logout... or something
    const startStreamingChannels = () => {
      const db = getFirestore();
      const q = query(collection(db, "channels"));
      unsubscribeFromChannelsFeed = onSnapshot(q, (querySnapshot) => {
        self.updateChannels(querySnapshot);
      });
    };

    const stopStreamingChannels = () => {
      if (unsubscribeFromChannelsFeed) {
        unsubscribeFromChannelsFeed();
      }
    };

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

    const login = flow(function* login({ username, password }) {
      const auth = getAuth();
      try {
        self.isLoading = true;
        self.loginError = null;
        const user = yield signInWithEmailAndPassword(auth, username, password);
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
      } catch (error) {
        // eh?
      }
    });

    // semi-private functions only used to encapsulate updates in actions
    const updateChannels = (querySnapshot) => {
      self.channels = [];
      querySnapshot.forEach((doc) => {
        self.channels.push({ id: doc.id, name: doc.data().name });
      });
    };

    const setIsLoggedIn = (isLoggedIn, user) => {
      self.isLoggedIn = isLoggedIn;
      self.user = user;
    };

    // sending/ receiving messages
    const sendMessage = flow(function* sendMessage({ text, channelId }) {
      const db = getFirestore();
      // get the address of the collection we're adding to
      const channelsCollection = collection(db, "channels");
      const channelDoc = doc(channelsCollection, channelId);
      const messagesCollection = collection(channelDoc, "messages");
      // add a message doc to the channel's message collection here
    });

    // stream messsages to the messages prop
    let unsubscribeFromChannelMessagesFeed;
    const startStreamingChannelMessages = (channelId) => {
      const db = getFirestore();
      // subscribe to channel's messages here
    };

    const stopStreamingCurrentChannel = () => {
      self.messages = [];
      unsubscribeFromChannelMessagesFeed();
    };

    // add semi-private function to update messages prop
    const updateMessages = (querySnapshot) => {
      self.messages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        self.messages.push({
          id: doc.id,
          uid: data.uid,
          username: data.username,
          // when message is added locally before upload, time is null because it will
          // later be set by the server
          time: data.time ? data.time.seconds * 1000 : new Date().getTime(),
          text: data.text,
        });
      });
    };

    return {
      afterCreate,
      addChannel,
      login,
      logout,
      startStreamingChannels,
      stopStreamingChannels,
      updateChannels,
      setIsLoggedIn,
      startStreamingChannelMessages,
      stopStreamingCurrentChannel,
      updateMessages,
      sendMessage,
    };
  });

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = RootStore.create();
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// We'll use this this to use the store in screen components
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // not likely, but sure
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
