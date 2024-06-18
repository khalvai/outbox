import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Result } from 'result';

@Injectable()
export class MessageBroker {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<Result<void>> {
    try {
      await this.amqpConnection.publish(exchange, routingKey, data);
      return Result.ok();
    } catch {
      return Result.fail('Failed to publish message', 500);
    }
  }
}
