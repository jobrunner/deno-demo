import { Context, Hono } from "hono";
import { UseCases } from "../application/usecases.ts";
import { Aggregate } from "../domain/aggregate.ts";

export const apiHandler = (useCases: UseCases) => {
  const app = new Hono();

  app.get("/aggregate/:id", async (ctx: Context): Promise<Response> => {
    const id = ctx.req.param("id");
    const aggregate = await useCases.getAggregate(id);
    if (!aggregate) {
      return ctx.text("Not Found", 404);
    }
    return ctx.json({
      id: aggregate.id,
      name: aggregate.name,
      value: aggregate.value,
    });
  });

  app.post("/aggregate", async (ctx: Context): Promise<Response> => {
    const { id, name, value } = await ctx.req.json();
    const aggregate = new Aggregate({ id, name, value });
    await useCases.saveAggregate(aggregate);
    return ctx.text("Saved", 201);
  });

  return app;
};
