import { Body, Controller, Get, Headers, Post, RawBody } from '@nestjs/common';
import { CreatePaymentService } from './services/createPayment.service';
import { Public } from '../shared/decorators/PublicDecorator';
import { HandleWebHookService } from './services/handleWebHook.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly handleWebhookService: HandleWebHookService
  ) {}

  @Post("createPayment")
  async createPayment(@Body() body: { idSocio: string, idTipoMembresia: string }) {
    return await this.createPaymentService.execute(body.idSocio, body.idTipoMembresia);
  }

  @Public()
  @Get("success")
  success() {
    return { message: "Pago exitoso" };
  }

  @Public()
  @Get("cancel")
  cancel() {
    return { message: "Pago cancelado" };
  }

  @Public()
  @Post("webhook")
  async webhook( @RawBody() rawBody: Buffer, @Headers("stripe-signature") sig: string ) {
      return await this.handleWebhookService.execute(rawBody, sig);
  }
}
