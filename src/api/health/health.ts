import { Context, Hono, Response } from "jsr:@hono/hono";

export function healthHandler(): Hono {
  const app = new Hono();

  app.get("/", (ctx: Context): Response => {
    return ctx.json({ status: "ok" });
  });

  return app;
}
