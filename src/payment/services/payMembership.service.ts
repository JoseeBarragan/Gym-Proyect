import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StripeService } from '../../stripe.service';
import type { ITypeMembershipRepository } from '../../typeMembership/Repository/ITypeMemRepository';

@Injectable()
export class PayMembershipService {
    constructor(
        @Inject("TypeMembershipRepository") private readonly typeMembershipRepository: ITypeMembershipRepository,
        private readonly stripeService: StripeService
    ) {}

    async execute(idSocio: string, idTypeMembership: string): Promise<string> {

        const typeMembership = await this.typeMembershipRepository.getTypeMembershipById(idTypeMembership);

        if (!typeMembership) {
            throw new NotFoundException("Tipo de membresía no encontrado");
        }

        const session = await this.stripeService.stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "ars",
                        unit_amount: typeMembership.precio * 100, // Stripe maneja centavos
                        product_data: {
                            name: typeMembership.nombre,
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/payments/success",
            cancel_url: "http://localhost:3000/payments/cancel",
            metadata: {
                idSocio,
                idTypeMembership,
            },
        })

        if (!session.url) {
            throw new NotFoundException("Error al crear la sesión de pago");
        }

        return session.url
    }
}
