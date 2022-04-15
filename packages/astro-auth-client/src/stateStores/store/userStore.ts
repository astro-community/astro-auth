import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

const userAtom = atom<any>({});
export default userAtom;

export const setUser = (newUser: any) => {
  userAtom.set(newUser);
};

export const useUser = () => {
  const user = useStore(userAtom);
  return user;
};
