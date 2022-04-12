import React, { FC } from "react";
import styles from "./index.module.css";

interface TypographyProps {
  children: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

const Typography: FC<TypographyProps> = ({ children, as: As }) => {
  return (
    <As
      className={styles.text}
      style={{
        fontSize: "4rem",
        fontFamily: "RTAliasMedium",
      }}
    >
      {children}
    </As>
  );
};

export default Typography;
