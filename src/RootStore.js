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
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth"; // use me for managing firebase auth

// create a type used by your RootStore
const Channel = types.model("Channel", {
  id: types.identifier,
  name: types.string,
});

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    channels: types.optional(types.array(Channel), []),
    isLoggedIn: types.optional(types.boolean, true), // set to true for now since we don't really have login sessions yet
  })
  .views((self) => ({
    get channelsSorted() {
      return sortBy(self.channels, (c) => c.id);
    },
  }))
  .actions((self) => {
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
      const auth = getAuth(); // gotta do something with this
      self.isLoggedIn = true;
    });

    const logout = flow(function* login({ username, password }) {
      const auth = getAuth(); // gotta do something with this
      self.isLoggedIn = false;
    });

    // semi-private function only used to encapsulate channel update
    const updateChannels = (querySnapshot) => {
      self.channels = [];
      querySnapshot.forEach((doc) => {
        self.channels.push({ id: doc.id, name: doc.data().name });
      });
    };

    // include semi-private function to set model prop in firebase auth callback
    const setIsLoggedIn = (isLoggedIn, user) => {
      self.isLoggedIn = isLoggedIn;
      self.user = user;
    };

    // special MST function called automatically on model create
    const afterCreate = () => {
      const auth = getAuth();
      // manage logged in/ logged out status here
    };

    return {
      afterCreate,
      addChannel,
      login,
      logout,
      startStreamingChannels,
      stopStreamingChannels,
      updateChannels,
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
