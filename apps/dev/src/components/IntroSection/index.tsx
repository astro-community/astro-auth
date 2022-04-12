import { Button, Title, GoogleButton } from "@astro-auth/ui";
import { signIn } from "@astro-auth/core";
import styles from "./index.module.css";

const IntroSection = () => {
  return (
    <div className={styles.content}>
      <Title as="h2">Welcome To Astro Auth Demo</Title>
      <div className={styles.getStarted}>
        <Button>Get Started</Button>
        <GoogleButton
          onClick={() => {
            console.log(signIn());
          }}
        />
      </div>
    </div>
  );
};

export default IntroSection;
