const signOut = async (request: Request) => {
  if (request.method != "DELETE") {
    return {
      status: 405,
      body: {
        error: "Method not allowed",
      },
    };
  }

  return {
    status: 200,
    headers: {
      "Set-Cookie":
        "__astroauth__session__=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    },
  };
};

export default signOut;
