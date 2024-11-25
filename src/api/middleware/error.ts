import { Context, Hono, Next } from "hono";

export function errorMiddleware() {
  const app = new Hono();

  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      console.error(err);
      ctx.response.status = 500;
      ctx.response.body = { error: "Internal server error" };
    }
  });

  return app;
}
