import { FC } from "react";
import { Button, Title, GoogleButton, DiscordButton } from "@astro-auth/ui";
import { signOut } from "@astro-auth/client";
import styles from "./index.module.css";
import { useUser } from "@astro-auth/client";

interface IntroSectionProps {
  isSignIn?: boolean;
  user?: any;
}

const IntroSection: FC<IntroSectionProps> = ({ isSignIn = false, user }) => {
  const storedUser = useUser();

  return (
    <div className={styles.content}>
      {isSignIn ? (
        <>
          <img src={user.user.picture} className={styles.profileImage} />
          <Title as="h2">{`Welcome To The Dashboard ${
            (user as any).user.given_name
          }`}</Title>
        </>
      ) : (
        <Title as="h2">Welcome To Astro Auth Demo</Title>
      )}
      {isSignIn ? (
        <div className={styles.getStarted}>
          <Button onClick={() => signOut()}>Log Out</Button>
        </div>
      ) : (
        <div className={styles.getStarted}>
          <GoogleButton />
          <DiscordButton />
        </div>
      )}

      <code>{JSON.stringify(storedUser)}</code>
    </div>
  );
};

export default IntroSection;
