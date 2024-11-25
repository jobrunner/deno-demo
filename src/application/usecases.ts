import { Repository } from "./ports/repository.ts";
import { EventPublisher } from "./ports/event-publisher.ts";
import { Aggregate } from "../domain/aggregate.ts";

export class UseCases {
  constructor(
    private repository: Repository,
    private eventPublisher: EventPublisher,
  ) {}

  async getAggregate(id: string): Promise<Aggregate | null> {
    return await this.repository.findById(id);
  }

  async saveAggregate(aggregate: Aggregate): Promise<void> {
    await this.repository.save(aggregate);
    await this.eventPublisher.publish({
      type: "AggregateSaved",
      payload: JSON.stringify({ id: aggregate.id }),
    });
  }
}
