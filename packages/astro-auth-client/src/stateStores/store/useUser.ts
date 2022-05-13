import axios from "redaxios";

const useUser = async () => {
  const user = await axios.get("/api/auth/user");
  return user.data;
};

export default useUser;
