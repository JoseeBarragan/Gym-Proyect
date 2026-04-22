import { Body, Controller, Post } from '@nestjs/common';
import { PayMembershipService } from './services/payMembership.service';
import { Public } from '../shared/decorators/PublicDecorator';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly payMembershipService: PayMembershipService
  ) {}

  @Public()
  @Post("payMembership")
  async payMembership(@Body() body: { idSocio: string, idTipoMembresia: string }) {
    return await this.payMembershipService.execute(body.idSocio, body.idTipoMembresia);
  }

}
