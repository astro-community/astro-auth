import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface SpotifyButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const SpotifyButton: FC<SpotifyButtonProps> = ({
  children = "Login With Spotify",
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
        src="https://img.icons8.com/ios-glyphs/280/ffffff/spotify.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default SpotifyButton;
