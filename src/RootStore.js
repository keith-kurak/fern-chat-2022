import { types } from "mobx-state-tree";
import React from "react";

// create a type used by your RootStore
const Channel = types.model("Channel", {
  id: types.number,
  name: types.string,
});

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    channels: types.optional(types.array(Channel), []),
  })
  .actions((self) => {
    const addChannel = () => {
      self.channels.push({ id: self.channels.length, name: "some-new-channel"});
    };

    return {
      addChannel,
    };
  });

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use

const StoreContext = React.createContext(null);

// mock data - we'll replace this later
const mockChannels = [
  {
    id: 1,
    name: "videogames",
  },
  {
    id: 2,
    name: "viralvideos",
  },
  {
    id: 3,
    name: "underwaterbasketweaving",
  },
  {
    id: 4,
    name: "codemash",
  },
  {
    id: 5,
    name: "mashedpotatoes",
  },
  {
    id: 6,
    name: "knittingcentral",
  },
  {
    id: 0,
    name: "llamatalk",
  },
];

export const StoreProvider = ({ children }) => {
  const store = RootStore.create({ channels: mockChannels });
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
