import { Aggregate } from "../../domain/aggregate.ts";

export interface Repository {
  save(aggregate: Aggregate): Promise<void>;
  findById(id: string): Promise<Aggregate | null>;
}
