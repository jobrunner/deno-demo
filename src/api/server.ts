import { Hono } from "hono";
import { MockRepository } from "../infrastructure/mock-repository.ts";
import { MockEventPublisher } from "../infrastructure/mock-event-publisher.ts";
import { UseCases } from "../application/usecases.ts";
import { logger } from "hono/logger";
import { apiHandler } from "./handler.ts";
import { healthHandler } from "./health/health.ts";
import { metricsHandler } from "./metrics/metrics.ts";
import { serveTcpOptions } from "../infrastructure/config.ts";

const repository = new MockRepository();
const eventPublisher = new MockEventPublisher();
const useCases = new UseCases(repository, eventPublisher);

// const port = parseInt(Deno.env.get("PORT"), 10) || 8000;

const app = new Hono();

// app.use(errorMiddleware);
app.use(logger());
app.route("/api", apiHandler(useCases));
app.route("/health", healthHandler());
app.route("/metrics", metricsHandler());

Deno.serve(serveTcpOptions, app.fetch);
