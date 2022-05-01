import { signIn } from "@astro-auth/client";
import React, { FC } from "react";
import styles from "../socialButtons.module.css";

interface TwitterButtonProps {
  children?: string;
  onClick?: () => void;
  callbackURL?: string;
}

const TwitterButton: FC<TwitterButtonProps> = ({
  children = "Login With Twitter",
  callbackURL,
  onClick = () =>
    signIn({
      provider: "twitter",
      callbackURL: callbackURL,
    }),
}) => {
  // TODO: Uncomment If pixelated border isn't working
  // useEffect(() => {
  //   if ("paintWorklet" in CSS) {
  //     // @ts-ignore
  //     CSS.paintWorklet.addModule(
  //       "http://yourjavascript.com/12922541814/pixel.js"
  //     );
  //   }
  // }, []);

  return (
    <button className={styles.button} onClick={onClick}>
      <img
        src="https://img.icons8.com/ios-glyphs/280/ffffff/twitter.png"
        style={{
          width: "20px",
        }}
      />
      <span>{children}</span>
    </button>
  );
};

export default TwitterButton;
