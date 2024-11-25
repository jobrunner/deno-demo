import { Repository } from "../application/ports/repository.ts";
import { Aggregate, AggregateProps } from "../domain/aggregate.ts";
type MockStore = AggregateProps[];

const store: MockStore = [];

export class MockRepository implements Repository {
  constructor() {
    const prop: AggregateProps = { id: "123", name: "bla blubb", value: 22 };
    store.push(prop);
  }

  async save(aggregate: Aggregate): Promise<void> {
    await store.push(aggregate.props);
  }

  async findById(id: string): Promise<Aggregate | null> {
    const props = store.filter((item) => item.id == id)?.[0];
    if (props) {
      return await new Aggregate(props);
    }

    return null;
  }
}
