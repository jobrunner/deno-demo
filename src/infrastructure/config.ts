const port = parseInt(Deno.env.get("PORT"), 10) || 8000;
const hostname = Deno.env.get("HOST") || "localhost";

export const serveTcpOptions: Deno.ServeTcpOptions = {
  port,
  hostname,
};
