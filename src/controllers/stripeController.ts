import { Request, Response } from 'express';
import { SubscriptionService } from '../services/stripe/subscriptionService';
import { PaymentIntentService } from '../services/stripe/paymentIntentService';
import { InvoiceService } from '../services/stripe/invoiceService';
import { ConnectService } from '../services/stripe/connectService';

class StripeController {
  private subscriptionService: SubscriptionService;
  private paymentIntentService: PaymentIntentService;
  private invoiceService: InvoiceService;
  private connectService: ConnectService;

  constructor() {
    this.subscriptionService = new SubscriptionService();
    this.paymentIntentService = new PaymentIntentService();
    this.invoiceService = new InvoiceService();
    this.connectService = new ConnectService();
  }

  // Subscription Management
  public async createSubscription(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.subscriptionService.createSubscription(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async updateSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await this.subscriptionService.updateSubscription(id, data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async cancelSubscription(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await this.subscriptionService.cancelSubscription(id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Payment Intents
  public async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.paymentIntentService.createPaymentIntent(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  public async setupPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.paymentIntentService.setupPaymentIntent(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Invoice Management
  public async createInvoice(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.invoiceService.createInvoice(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Stripe Connect for Marketplace
  public async manageConnectAccount(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const result = await this.connectService.manageConnectAccount(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Handle Webhooks
  public async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const event = req.body;
      // Process webhook event using appropriate service
      res.status(200).json({ received: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Handle Failed Payments
  public async handleFailedPayments(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      // Logic to handle failed payments
      res.status(200).json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StripeController();
