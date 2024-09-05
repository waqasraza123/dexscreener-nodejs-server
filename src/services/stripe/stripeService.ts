import Stripe from 'stripe';

export default new class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20", });
  }

  async getPricesForProduct(productId: string) {
    try {
      const prices = await this.stripe.prices.list({
        product: productId,
        active: true,
      });
      return prices.data;
    } catch (error: any) {
      throw new Error(`Failed to retrieve prices: ${error.message}`);
    }
  }
}