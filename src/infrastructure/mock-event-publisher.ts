import { EventPublisher } from "../application/ports/event-publisher.ts";

export class MockEventPublisher implements EventPublisher {
  async publish(event: { type: string; payload: string }): Promise<void> {
    await console.log("Event published:", event);
  }
}
