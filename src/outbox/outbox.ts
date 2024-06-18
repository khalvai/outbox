export class Outbox {
  id: number;

  eventType: string;

  payload: any;

  dispatched: boolean;

  createdAt: Date;
}
