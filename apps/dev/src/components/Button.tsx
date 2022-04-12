import { Button, Typography } from "@astro-auth/ui";

const NewButton = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography as="h4">Hello World</Typography>

        <Button />
      </div>
    </div>
  );
};

export default NewButton;
