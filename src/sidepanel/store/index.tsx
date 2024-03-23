/* eslint-disable react-refresh/only-export-components -- TODO: fix */
import React, { createContext, useCallback, useContext, useMemo } from "react";

import * as data from "./modules/data";
import * as settings from "./modules/settings";

const modulesMap = {
  data,
  settings,
};

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed
const state = Object.fromEntries(
  Object.entries(modulesMap).map(([key, module]) => [key, module.initialState]),
) as { [K in keyof typeof modulesMap]: (typeof modulesMap)[K]["initialState"] };

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- needed
const actionsMap = Object.fromEntries(
  Object.entries(modulesMap).map(([key, module]) => [key, module.actions]),
) as { [K in keyof typeof modulesMap]: (typeof modulesMap)[K]["actions"] };

type ActionsMap = typeof actionsMap;
type GlobalState = typeof state;

interface StoreContextProps {
  dispatch: <K extends keyof ActionsMap>(module: K) => (a: ActionsMap[K]) => GlobalState[K];
  setState: (state: GlobalState | ((v: GlobalState) => GlobalState)) => void;
  state: GlobalState;
}

const initialState: StoreContextProps = {
  dispatch: () => {
    throw new Error("StoreProvider not found");
  },
  setState: () => {
    throw new Error("StoreProvider not found");
  },
  state,
};

const StoreContext = createContext<StoreContextProps>(initialState);

export const StoreProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement => {
  const [storeState, setStoreState] = React.useState<StoreContextProps["state"]>(
    initialState.state,
  );

  const computedDispatch = useCallback<StoreContextProps["dispatch"]>(
    (module, moduleActions) => {},
    [],
  );

  const contextValue = useMemo<StoreContextProps>(
    () => ({
      dispatch: computedDispatch,
      state: storeState,
      setState: setStoreState,
    }),
    [computedDispatch, storeState],
  );

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextProps => useContext(StoreContext);

/** eslint-enable */

export const ssss = useStore().dispatch("settings");
