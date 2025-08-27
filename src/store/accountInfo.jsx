import { create } from "zustand";

export const useAccountStore = create((set, get) => ({
  account: {username: "", password: ""},
  isSignedIn: () => {
    const currentState = get();
    return currentState.account.username.trim() !== "" && currentState.account.password.trim() !== ""
  },
  logIn: (username='', password='') => set({ account: {username, password} }),
  logOut: () => set({ account: {username: "", password: ""} }),
  
  redirectionPath: '/',
  setRedirectionPath: (path) => set({redirectionPath: path})
}))
