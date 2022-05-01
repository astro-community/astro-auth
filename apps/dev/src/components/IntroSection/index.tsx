import { FC, useRef } from "react";
import {
  Button,
  Title,
  GoogleButton,
  DiscordButton,
  TwitterButton,
} from "@astro-auth/ui";
import { signIn, signOut, useUser } from "@astro-auth/client";
import styles from "./index.module.css";

interface IntroSectionProps {
  isSignIn?: boolean;
  user?: any;
}

const IntroSection: FC<IntroSectionProps> = ({ isSignIn = false, user }) => {
  const storedUser = useUser();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.content}>
      {isSignIn ? (
        <>
          {user.user && (
            <>
              <img src={user.user.image} className={styles.profileImage} />
              <Title as="h2">{`Welcome To The Dashboard ${user.user.name}`}</Title>
            </>
          )}
        </>
      ) : (
        <Title as="h2">Welcome To Astro Auth Demo</Title>
      )}

      {isSignIn ? (
        <div className={styles.getStarted}>
          <Button onClick={() => signOut()}>Log Out</Button>
        </div>
      ) : (
        <div>
          <div className={styles.getStarted}>
            <GoogleButton callbackURL="https://youtu.be/dQw4w9WgXcQ" />
            <DiscordButton />
            <TwitterButton />
          </div>

          <div>
            <input type="text" placeholder="Email" ref={emailRef} />
            <input type="text" placeholder="Password" ref={passwordRef} />
          </div>

          <button
            onClick={() => {
              signIn({
                provider: "credential",
                login: {
                  email: emailRef.current?.value,
                  password: passwordRef.current?.value,
                },
              });
            }}
          >
            LOGIN
          </button>
        </div>
      )}

      <code>{JSON.stringify(storedUser)}</code>
    </div>
  );
};

export default IntroSection;
