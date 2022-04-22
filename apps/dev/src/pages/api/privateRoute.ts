import { getUser } from "@astro-auth/core";

export const get = (_, request: Request) => {
  const user = getUser({ server: request });

  if (!user) {
    return new Response(
      JSON.stringify({
        secret: "No ACCESS ⚠️",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      secret: "🤫",
      user,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
