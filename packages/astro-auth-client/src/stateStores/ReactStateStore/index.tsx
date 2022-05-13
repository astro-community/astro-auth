import React, { useEffect } from "react";
import userAtom, { setUser } from "../store/userStore";
import { useStore } from "@nanostores/react";
import axios from "redaxios";

interface ReactStateStoreProps {
  user: any;
}

const ReactStateStore = ({ user }: ReactStateStoreProps) => {
  useEffect(() => {
    setUser(user);
  }, [user]);

  return null;
};

ReactStateStore.useUser = (config?: { update?: boolean }) => {
  const user = useStore(userAtom);

  useEffect(() => {
    (async () => {
      if (config?.update) {
        const fetchedUser = await axios.get("/api/auth/user");
        setUser(fetchedUser.data);
      }
    })();
  }, []);

  return user;
};

export default ReactStateStore;
