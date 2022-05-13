import { atom } from "nanostores";

const userAtom = atom<any>(null);
export default userAtom;

export const setUser = (newUser: any) => {
  userAtom.set(newUser);
};
