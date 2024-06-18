import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { RabbitMqModule } from 'src/rabbitMq/rabbitMq.module';
import { ContentConsumerController } from 'src/outbox-consumer';
import { OutboxDispatcherService } from 'src/outbox/outbox-dispatcher.service';

@Module({
  imports: [ScheduleModule.forRoot(), RabbitMqModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    OutboxDispatcherService,
    ContentConsumerController,
  ],
})
export class AppModule {}
