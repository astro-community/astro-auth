import { ReactStateStore } from "@astro-auth/client";

const UserStore = ({ user }) => {
  return <ReactStateStore user={user} />;
};

export default UserStore;
