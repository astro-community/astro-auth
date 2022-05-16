import { signIn } from "@astro-auth/client";
import React, { FC, useEffect } from "react";
import styles from "../socialButtons.module.css";

interface MetamaskButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const MetamaskButton: FC<MetamaskButtonProps> = ({
  children = "Login With Metamask",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "metamask",
      // callbackURL: callbackURL,
    }),
}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-filled/280/ffffff/metamask-logo.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default MetamaskButton;
