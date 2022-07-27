import { createContext } from "react";
export const UserAuth = createContext({
  isSignedIn: false,
  setIsSignedIn: (any: any): any => null,
});
