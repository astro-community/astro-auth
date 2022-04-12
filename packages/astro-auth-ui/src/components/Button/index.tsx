import React, { FC, useEffect } from "react";
import styles from "./index.module.css";

interface ButtonProps {
  children: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
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
      {children}
    </button>
  );
};

export default Button;
