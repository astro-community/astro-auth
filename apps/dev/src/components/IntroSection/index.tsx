import { FC } from "react";
import { Button, Title, GoogleButton, DiscordButton } from "@astro-auth/ui";
import { signOut,useUser } from "@astro-auth/client";
import styles from "./index.module.css";

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
          <img src={user.user.image} className={styles.profileImage} />
          <Title as="h2">{`Welcome To The Dashboard ${user.user.name}`}</Title>
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
