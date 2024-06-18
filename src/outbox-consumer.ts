import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';

@Controller()
export class ContentConsumerController {
  constructor() {}

  @RabbitSubscribe({
    queue: 'Event_queue',
    createQueueIfNotExists: false,
  })
  onContentGenerated(@Payload() event: any) {
    console.log('proccessing event:', event);
  }
}
