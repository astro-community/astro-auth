interface AstroAuthParams {
  AuthProviders?: any;
}

const AstroAuth =
  ({}: AstroAuthParams) =>
  ({ astroauth }: { astroauth: string }, request: Request) => {
    return new Response(
      JSON.stringify({
        method: request.method,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

export default AstroAuth;
