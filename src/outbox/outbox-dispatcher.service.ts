// src/outbox-dispatcher.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MessageBroker } from 'src/rabbitMq/message-broker';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class OutboxDispatcherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageBroker: MessageBroker,
  ) {}

  @Cron('*/20 * * * * *')
  async dispatchEvents() {
    console.log(`cron is running: ${Date.now()}`);

    const events = await this.prisma.outbox.findMany({
      where: { dispatched: false },
    });

    for (const event of events) {
      try {
        await this.messageBroker.publish('Event', 'event:published', event);
        await this.prisma.outbox.update({
          where: { id: event.id },
          data: { dispatched: true },
        });
      } catch (error) {
        console.error('Failed to dispatch event', event, error);
      }
    }
  }
}
