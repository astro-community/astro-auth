import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface ZoomButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const ZoomButton: FC<ZoomButtonProps> = ({
  children = "Login With Zoom",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "discord",
      callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/material-sharp/280/ffffff/zoom.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children ?? "Login With Zoom"}</span>
    </button>
  );
};

export default ZoomButton;
