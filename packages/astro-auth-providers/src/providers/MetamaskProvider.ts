import { MetamaskConfig, MetamaskUserOptions } from "@astro-auth/types";

const CredentialProvider = (options: MetamaskUserOptions): MetamaskConfig => {
  return {
    id: "metamask",
    type: "metamask",
    options,
  };
};

export default CredentialProvider;
