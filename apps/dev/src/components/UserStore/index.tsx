import { ReactStateStore } from "@astro-auth/client";

const UserStore = ({ user }: { user?: any }) => {
  return <ReactStateStore user={user} />;
};

export default UserStore;
