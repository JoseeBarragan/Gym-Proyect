import { BadRequestException, Injectable } from "@nestjs/common";
import { StripeService } from "../../stripe.service";
import { AsignMembershipService } from "../../membership/services/AsignMembership.service";
import { RegisterPaymentService } from "./RegisterPayment.service";

@Injectable()
export class HandleWebHookService {
    constructor(
        private readonly stripeService: StripeService, 
        private readonly assignMembershipService: AsignMembershipService,
        private readonly registerPaymentService: RegisterPaymentService
    ) 
    {}

    async execute(rawBody: Buffer, sig: string): Promise<void> {
        let event: Awaited<ReturnType<typeof this.stripeService.stripe.webhooks.constructEvent>>;
    
        try {
            event = this.stripeService.stripe.webhooks.constructEvent(
                rawBody,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET ?? ""
            );
        } catch (err) {
            console.log(err)
            throw new BadRequestException("Webhook signature inválida");
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
                
            if (!session.metadata) {
                throw new BadRequestException("Metadata no encontrada");
            }
            
            const { idSocio, idTypeMembership } = session.metadata;
        
            const membresia = await this.assignMembershipService.execute(idSocio, idTypeMembership);
        
            await this.registerPaymentService.execute(
                session.payment_intent as string,
                membresia.idMembresia,
                session.amount_total ? session.amount_total / 100 : 0
            );
        }
    }
}