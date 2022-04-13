import { FC } from "react";
import { Button, Title, GoogleButton } from "@astro-auth/ui";
import styles from "./index.module.css";

interface IntroSectionProps {
  isSignIn?: boolean;
}

const IntroSection: FC<IntroSectionProps> = ({ isSignIn = false }) => {
  return (
    <div className={styles.content}>
      {isSignIn ? (
        <Title as="h2">Welcome To The Dashboard</Title>
      ) : (
        <Title as="h2">Welcome To Astro Auth Demo</Title>
      )}
      {isSignIn ? (
        <div className={styles.getStarted}>
          <Button>Log Out</Button>
        </div>
      ) : (
        <div className={styles.getStarted}>
          <Button>Get Started</Button>
          <GoogleButton />
        </div>
      )}
    </div>
  );
};

export default IntroSection;
