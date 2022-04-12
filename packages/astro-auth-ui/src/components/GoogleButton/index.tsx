import React, { FC, useEffect } from "react";
import styles from "./index.module.css";

interface GoogleButtonProps {
  children?: string;
  onClick?: () => void;
}

const GoogleButton: FC<GoogleButtonProps> = ({
  children = "Login With Google",
  onClick,
}) => {
  useEffect(() => {
    if ("paintWorklet" in CSS) {
      // @ts-ignore
      CSS.paintWorklet.addModule(
        "http://yourjavascript.com/12922541814/pixel.js"
      );
    }
  }, []);

  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/google-logo--v1.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default GoogleButton;
