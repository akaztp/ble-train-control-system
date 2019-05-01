export type Subscriber<T> = (data: T) => void;
export type Unsubscriber = () => void;

export class Observer<T> {
  protected subscribers: Array<Subscriber<T>> = [];
  protected lastValue: T | undefined = undefined;

  public subscribe(s: Subscriber<T>): Unsubscriber {
    let index = this.subscribers.push(s);
    if (this.lastValue !== undefined) {
      s(this.lastValue);
    }
    return () => {
      if (index >= 0) {
        this.subscribers = this.subscribers.splice(index, 1);
        index = -1;
      }
    };
  }

  public notify(data: T): void {
    this.lastValue = data;
    this.subscribers.forEach((s) => s(data));
  }
}
