import Stripe from 'stripe';

export class SubscriptionService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-06-20",
    });
  }

  // Create a new subscription
  public async createSubscription(data: any) {
    this.stripe.subscriptions.list
    console.log(data)
    try {
      const customer = await this.stripe.customers.create({
        email: data.email,
        payment_method: data.paymentMethodId,
        invoice_settings: {
          default_payment_method: data.paymentMethodId,
        },
      });

      const subscription = await this.stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: data.priceId }],
        expand: ['latest_invoice.payment_intent'],
      });

      return subscription;
    } catch (error: any) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  // Update an existing subscription
  public async updateSubscription(id: string, data: any) {
    try {
      const subscription = await this.stripe.subscriptions.update(id, {
        cancel_at_period_end: false, // Optional: Controls whether the subscription should be canceled at the end of the current period
        items: [
          {
            id: data.subscriptionItemId,
            price: data.newPriceId,
          },
        ],
        proration_behavior: 'create_prorations', // Optional: Adjusts for mid-cycle plan changes
      });

      return subscription;
    } catch (error: any) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }
  }

  // Cancel a subscription
  public async cancelSubscription(id: string) {
    // try {
    //   const canceledSubscription = await this.stripe.subscriptions.del(id, {
    //     invoice_now: true, // Optional: Creates a final invoice before cancellation
    //     prorate: true, // Optional: Prorate charges
    //   });

    //   return canceledSubscription;
    // } catch (error: any) {
    //   throw new Error(`Failed to cancel subscription: ${error.message}`);
    // }
  }
}
