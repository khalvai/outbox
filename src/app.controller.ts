import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order-service';

@Controller()
export class AppController {
  constructor(private readonly appService: OrderService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('order/issue')
  async issueOrder() {
    return this.appService.createOrder({});
  }
}
