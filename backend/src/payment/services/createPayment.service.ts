import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StripeService } from '../../stripe.service';
import type { ITypeMembershipRepository } from '../../typeMembership/Repository/ITypeMemRepository';
import type { IUsersRepository } from '../../users/repository/InterfaceRepository';

@Injectable()
export class CreatePaymentService {
    constructor(
        @Inject("TypeMembershipRepository") private readonly typeMembershipRepository: ITypeMembershipRepository,
        private readonly stripeService: StripeService,
        @Inject("UsersRepository") private readonly usersRepository: IUsersRepository
    ) {}

    async execute(email: string, idTypeMembership: string): Promise<string> {
        const user = await this.usersRepository.getByEmail(email);

        if (!user) {
            throw new NotFoundException("Usuario no encontrado");
        }

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
                            name: "Plan " + typeMembership.nombre,
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: "http://localhost:3000/payment/success",
            cancel_url: "http://localhost:3000/payment/cancel",
            metadata: {
                idSocio: user.idUsuario,
                idTypeMembership,
            },
        })

        if (!session.url) {
            throw new NotFoundException("Error al crear la sesión de pago");
        }

        return JSON.stringify(session.url)
    }
}
