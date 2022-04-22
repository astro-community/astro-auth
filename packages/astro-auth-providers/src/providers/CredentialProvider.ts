import { CredentialUserOptions, CredentialConfig } from "@astro-auth/types";

const CredentialProvider = (
  options: CredentialUserOptions
): CredentialConfig => {
  return {
    id: "credential",
    type: "credential",
    options,
  };
};

export default CredentialProvider;
