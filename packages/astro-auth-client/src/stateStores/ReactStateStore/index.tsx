import React, { FC, useEffect } from "react";
import { useStore } from "@nanostores/react";
import userAtom, { setUser } from "../store/userStore";

interface ReactStateStoreProps {
  user: any;
}

const ReactStateStore: FC<ReactStateStoreProps> = ({ user }) => {
  useEffect(() => {
    setUser(user);
  }, [user]);

  return null;
};

export default ReactStateStore;
