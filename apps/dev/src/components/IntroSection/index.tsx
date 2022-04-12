import { Button, Title, GoogleButton } from "@astro-auth/ui";
import styles from "./index.module.css";

const IntroSection = () => {
  return (
    <div className={styles.content}>
      <Title as="h2">Welcome To Astro Auth Demo</Title>
      <div className={styles.getStarted}>
        <Button>Get Started</Button>
        <GoogleButton />
      </div>
    </div>
  );
};

export default IntroSection;
