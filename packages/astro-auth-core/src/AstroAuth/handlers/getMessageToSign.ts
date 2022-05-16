const getMessageToSign = (message: string) => {
  return message ?? "Welcome To Astro Auth";
};

export default getMessageToSign;
