import { Button, Title } from "@astro-auth/ui";
import styles from "./index.module.css";

const IntroSection = () => {
  return (
    <div className={styles.content}>
      <Title as="h2">Welcome To Astro Auth Demo</Title>
      <div className={styles.getStarted}>
        <Button>Get Started</Button>
        <Button>Login With Google</Button>
      </div>
    </div>
  );
};

export default IntroSection;