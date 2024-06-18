import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MessageBroker } from './message-broker';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('RABBITMQ_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MessageBroker, ConfigService],
  exports: [MessageBroker, ConfigService],
})
export class RabbitMqModule {}
