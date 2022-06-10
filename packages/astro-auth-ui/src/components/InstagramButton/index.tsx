import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface InstagramButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const InstagramButton: FC<InstagramButtonProps> = ({
  children = "Login With Instagram",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "instagram",
      callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/instagram-new.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children ?? "Login With Instagram"}</span>
    </button>
  );
};

export default InstagramButton;
