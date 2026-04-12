type headersType = [string, string][] | Record<string, string> | undefined;

export const api = (
  parameter: string = "/",
  method: string = "GET",
  body: string = "",
  headers: headersType = { "Content-Type": "application/json" },
) => {
  return fetch(
    `${import.meta.env.VITE_API}${parameter}`,
    method === "GET"
      ? {
          method,
          credentials: "include",
        }
      : { method, headers, credentials: "include", body },
  );
};
