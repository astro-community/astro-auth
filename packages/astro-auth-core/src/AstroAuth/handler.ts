import { AstroAuthParams } from ".";
import signIn from "./signIn";

const astroAuthHandler = (
  request: Request,
  url: string,
  config: AstroAuthParams
) => {
  switch (url) {
    case "signin": {
      signIn();
    }
  }
};

export default astroAuthHandler;
