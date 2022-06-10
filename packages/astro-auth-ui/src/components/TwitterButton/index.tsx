import { signIn } from "@astro-auth/client";
import React, { FC } from "react";
import styles from "../socialButtons.module.css";

interface TwitterButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const TwitterButton: FC<TwitterButtonProps> = ({
  children = "Login With Twitter",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "twitter",
      callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/twitter.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children ?? "Login With Twitter"}</span>
    </button>
  );
};

export default TwitterButton;
