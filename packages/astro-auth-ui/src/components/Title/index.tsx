import React, { FC } from "react";
import styles from "./index.module.css";

interface TitleProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const Title: FC<TitleProps> = ({ children, as: As = "h2" }) => {
  return <As className={styles.text}>{children}</As>;
};

export default Title;
