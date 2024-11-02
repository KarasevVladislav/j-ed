import { createContext, useContext } from 'react';
import { Chunk } from './types/chunks';

type AppContextType = {
  chunks: Record<number, Chunk>;
}

const APP_DEFAULT_CONTEXT: AppContextType = {
	chunks: {},
};

export const AppContext = createContext<AppContextType>(APP_DEFAULT_CONTEXT);

export const useAppContext = () => useContext(AppContext);
