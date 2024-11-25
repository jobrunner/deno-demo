export interface AggregateProps {
  id: string;
  name: string;
  value: number;
}

export class Aggregate {
  private _props: AggregateProps;

  constructor(props: AggregateProps) {
    this._props = props;
  }

  public get id(): string {
    return this._props.id;
  }

  public get name(): string {
    return this._props.name;
  }

  public get value(): number {
    return this._props.value;
  }

  public updateValue(newValue: number): void {
    if (newValue < 0) {
      throw new Error("Value cannot be negative.");
    }
    this._props.value = newValue;
  }

  public get props(): AggregateProps {
    return this._props;
  }
}
