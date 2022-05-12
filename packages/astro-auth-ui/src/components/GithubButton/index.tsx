import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface GithubButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const GithubButton: FC<GithubButtonProps> = ({
  children = "Login With Github",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "github",
      callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/github.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default GithubButton;
