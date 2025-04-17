import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const LoaderContext = createContext<{
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}>(null!);

export const useLoader = () => useContext(LoaderContext);
