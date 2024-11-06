import { createContext, useContext } from 'react';

export type AppContextType = {
  patchData: (index: number, key: string, value: unknown) => void;
};

const APP_DEFAULT_CONTEXT: AppContextType = {
	patchData: () => {},
};

export const AppContext = createContext<AppContextType>(APP_DEFAULT_CONTEXT);

export const useAppContext = () => useContext(AppContext);
