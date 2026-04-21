import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './services/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Post("payMembership")
  async payMembership(@Body() body: { idSocio: string, idTypeMembership: string }) {
    // return await this.paymentService.payMembership(body.idSocio, body.idTypeMembership);
  }
}
