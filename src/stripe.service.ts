// shared/stripe/stripe.service.ts
import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class StripeService {
    public readonly stripe: InstanceType<typeof Stripe>
    constructor() {
        this.stripe = new Stripe(process.env.SECRET_STRIPE_KEY ?? "");
    }
}