const getURLSlash = (url: string) => {
  return url.split("").pop() == "/" ? "" : "/";
};

export default getURLSlash;
