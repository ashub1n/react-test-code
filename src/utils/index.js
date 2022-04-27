import { createContext } from "react";
export const TokenContext = createContext({
    authenticated: localStorage.getItem('token'),
    setAuthenticated: (auth) => {}
  });

export default {TokenContext};