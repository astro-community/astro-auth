const parseCookie = (str: string) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce(
      (
        acc: {
          [key: string]: string;
        },
        v
      ) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      },
      {}
    );

export default parseCookie;
