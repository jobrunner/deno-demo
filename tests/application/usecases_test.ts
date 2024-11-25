import { UseCases } from "../../src/application/usecases.ts";
import { MockRepository } from "../../src/infrastructure/mock-repository.ts";
import { MockEventPublisher } from "../../src/infrastructure/mock-event-publisher.ts";
import { Aggregate } from "../../src/domain/aggregate.ts";

Deno.test("UseCases should save and retrieve an aggregate", async () => {
  const repository = new MockRepository();
  const eventPublisher = new MockEventPublisher();
  const useCases = new UseCases(repository, eventPublisher);

  const aggregate = new Aggregate({ id: "1", name: "Test", value: 100 });
  await useCases.saveAggregate(aggregate);
  const retrieved = await useCases.getAggregate("1");
  if (!retrieved) throw new Error("Aggregate not found");
  if (retrieved.value !== 100) throw new Error("Incorrect aggregate value");
});
