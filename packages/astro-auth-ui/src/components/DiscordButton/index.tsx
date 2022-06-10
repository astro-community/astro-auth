import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface DiscordButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const DiscordButton: FC<DiscordButtonProps> = ({
  children = "Login With Discord",
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
        src="https://img.icons8.com/ios-glyphs/280/ffffff/discord--v1.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children ?? "Login With Discord"}</span>
    </button>
  );
};

export default DiscordButton;
