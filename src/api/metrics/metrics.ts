import { Context, Hono, Next, Response } from "hono";
import { Counter, Registry } from "jsr:@wok/prometheus";

export const metricsHandler = () => {
  const app = new Hono();

  const counter = Counter.with({
    name: "http_requests_total",
    help: "The total HTTP requests",
    labels: ["path", "method", "status"],
  });

  app.get("/", (ctx: Context): Response => {
    ctx.set("Content-Type", "text/plain; version=0.0.4");
    return ctx.text(Registry.default.metrics(), 200);
  });

  app.use("*", async (c: Context, next: Next): Promise<void> => {
    await next();
    counter.labels({
      path: new URL(c.req.url).pathname,
      method: c.req.method,
      status: c.res.status.toString() || "",
    }).inc();
  });

  app.get("/aha", (c): Response => {
    return c.text("Hello World", 200);
  });

  return app;
};
