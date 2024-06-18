import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(orderData) {
    return this.prisma.$transaction(async (prisma) => {
      // Perform main transaction operations
      // const order = await prisma.order.create({ data: orderData });

      // Write event to outbox
      await prisma.outbox.create({
        data: {
          eventType: 'OrderCreated',
          payload: orderData,
        },
      });
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}
