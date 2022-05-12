import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface FacebookButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const FacebookButton: FC<FacebookButtonProps> = ({
  children = "Login With Facebook",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "facebook",
      callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/facebook-new.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default FacebookButton;
