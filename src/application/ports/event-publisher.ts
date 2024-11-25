export interface EventPublisher {
  publish(event: { type: string; payload: string }): Promise<void>;
}
