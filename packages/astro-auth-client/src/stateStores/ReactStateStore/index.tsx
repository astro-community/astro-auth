import React, { useEffect } from "react";
import userAtom, { setUser } from "../store/userStore";
import { useStore } from "@nanostores/react";

interface ReactStateStoreProps {
  user: any;
}

const ReactStateStore = ({ user }: ReactStateStoreProps) => {
  useEffect(() => {
    setUser(user);
  }, [user]);

  return null;
};

ReactStateStore.useStore = () => {
  const user = useStore(userAtom);
  return user;
};

export default ReactStateStore;
