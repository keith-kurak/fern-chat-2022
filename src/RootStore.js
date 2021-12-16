import { types, flow } from "mobx-state-tree";
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
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// create a type used by your RootStore
const Channel = types.model("Channel", {
  id: types.string,
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
      unsubscribeFromChannelsFeed();
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
      updateChannels,
      setIsLoggedIn,
      setIsLoading,
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

export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // not likely, but sure
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
