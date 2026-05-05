import { Body, Controller, Get, Headers, Post, RawBody } from '@nestjs/common';
import { CreatePaymentService } from './services/createPayment.service';
import { Public } from '../shared/decorators/PublicDecorator';
import { HandleWebHookService } from './services/handleWebHook.service';
import { CreatePaymentRequestDto } from './dto/createPaymentRequest.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiBody, ApiHeader } from '@nestjs/swagger';
import { Roles } from '../shared/decorators/RoleDecorator';
import { GetPaymentsService } from './services/getPayments.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly createPaymentService: CreatePaymentService,
    private readonly handleWebhookService: HandleWebHookService,
    private readonly getPaymentsService: GetPaymentsService
  ) {}

  @Roles("Administrador")
  @ApiBearerAuth()
  @Get("")
  @ApiOperation({ summary: 'Obtener todos los pagos', description: 'Retorna una lista con el historial de todos los pagos registrados en el sistema.' })
  @ApiOkResponse({
    description: 'Lista de pagos obtenida exitosamente.',
    schema: {
      example: [
        {
          idPago: '123e4567-e89b-12d3-a456-426614174000',
          idMembresia: '987fcdeb-51a2-43d7-9012-3214567890ab',
          monto: 1500,
          fechaPago: '2026-05-04T10:30:00.000Z',
          metodoPago: 'STRIPE',
          estadoPago: 'COMPLETADO'
        }
      ]
    }
  })
  async getPayments() {
    return await this.getPaymentsService.execute();
  }


  @Post("createPayment")
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear sesion de pago', description: 'Genera una sesion de checkout en Stripe y retorna la URL de pago.' })
  @ApiBody({ type: CreatePaymentRequestDto })
  @ApiOkResponse({
    description: 'URL de checkout creada',
    schema: {
      example: 'https://checkout.stripe.com/c/pay/cs_test_...'
    }
  })
  @ApiNotFoundResponse({ description: 'Tipo de membresia no encontrado o no se pudo crear sesion' })
  @ApiUnauthorizedResponse({ description: 'Token no proporcionado o invalido' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado con Stripe o backend' })
  async createPayment(@Body() body: CreatePaymentRequestDto) {
    return await this.createPaymentService.execute(body.idSocio, body.idTipoMembresia);
  }

  @Public()
  @Get("success")
  @ApiOperation({ summary: 'Callback de pago exitoso', description: 'Endpoint de retorno cuando Stripe redirige por pago exitoso.' })
  @ApiOkResponse({
    description: 'Pago exitoso',
    schema: {
      example: {
        message: 'Pago exitoso'
      }
    }
  })
  success() {
    return { message: "Pago exitoso" };
  }

  @Public()
  @Get("cancel")
  @ApiOperation({ summary: 'Callback de pago cancelado', description: 'Endpoint de retorno cuando Stripe redirige por cancelacion.' })
  @ApiOkResponse({
    description: 'Pago cancelado',
    schema: {
      example: {
        message: 'Pago cancelado'
      }
    }
  })
  cancel() {
    return { message: "Pago cancelado" };
  }

  @Public()
  @Post("webhook")
  @ApiOperation({ summary: 'Webhook de Stripe', description: 'Procesa eventos de Stripe, valida firma, crea membresia y registra pago para checkout completado.' })
  @ApiHeader({ name: 'stripe-signature', required: true, description: 'Firma enviada por Stripe' })
  @ApiOkResponse({ description: 'Webhook procesado correctamente' })
  @ApiBadRequestResponse({ description: 'Firma invalida o metadata ausente' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado al procesar webhook' })
  async webhook( @RawBody() rawBody: Buffer, @Headers("stripe-signature") sig: string ) {
      return await this.handleWebhookService.execute(rawBody, sig);
  }
}
