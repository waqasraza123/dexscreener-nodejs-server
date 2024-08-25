import express, { Router } from 'express';
import StripeController from '../controllers/stripeController';

const stripeRouter: Router = express.Router();

// Subscription Management
stripeRouter.post('/subscriptions', StripeController.createSubscription.bind(StripeController));
stripeRouter.put('/subscriptions/:id', StripeController.updateSubscription.bind(StripeController));
stripeRouter.delete('/subscriptions/:id', StripeController.cancelSubscription.bind(StripeController));

// Payment Intents
stripeRouter.post('/payment-intents', StripeController.createPaymentIntent.bind(StripeController));
stripeRouter.post('/setup-intents', StripeController.setupPaymentIntent.bind(StripeController));

// Invoice Management
stripeRouter.post('/invoices', StripeController.createInvoice.bind(StripeController));

// Stripe Connect for Marketplace
stripeRouter.post('/connect', StripeController.manageConnectAccount.bind(StripeController));

// Handle Webhooks
stripeRouter.post('/webhook', StripeController.handleWebhook.bind(StripeController));

// Handle Failed Payments
stripeRouter.post('/failed-payments', StripeController.handleFailedPayments.bind(StripeController));

export default stripeRouter;
