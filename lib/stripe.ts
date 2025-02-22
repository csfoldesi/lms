import { Stripe } from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_KEY!);

/*let _stripe: Stripe | null = null;
const getStripe = (): Stripe => {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_API_KEY as string);
  }
  return _stripe;
};

export const stripe = getStripe();
*/
