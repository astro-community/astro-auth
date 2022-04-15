import { atom } from "nanostores";

const user = atom<any>({});
export default user;

export const setUser = (newUser: any) => {
  user.set(newUser);
};
