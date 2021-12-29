import { types } from "mobx-state-tree";
import { sortBy } from "lodash";
import React from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator"; // use this to create new channels without making a new screen

// create a RootStore that keeps all the state for the app
const RootStore = types.model("RootStore", {
  // model fields go here!
});

// mock data - we'll replace this later
const mockChannels = [
  // fill me in!
];

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use
// I'm putting all this code in the template because I can't remember it without googling!

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = RootStore.create({ channels: mockChannels });
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
