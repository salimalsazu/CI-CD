import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';
import { QARoutes } from '../modules/productQA/productQA.routes';
import { KidRoutes } from '../modules/kid/kid.routes';
import { BarcodeRoutes } from '../modules/barcode/barcode.routes';
import { ProductRoutes } from '../modules/products/products.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { PromoCodeRoutes } from '../modules/promoCode/promoCode.routes';
import { BlogsRoutes } from '../modules/blogs/blogs.routes';
import { TaxRoutes } from '../modules/tax/tax.routes';
import { CommentRoutes } from '../modules/blog-comments/comments.routes';
import { OrderRoutes } from '../modules/orders/orders.routes';
import { StripeRoutes } from '../modules/payments/stripe.routes';
import { PaymentReportRoutes } from '../modules/paymentReport/payment.routes';
import { PaypalRoutes } from '../modules/paypal-payments/paypal.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/qa',
    route: QARoutes,
  },
  {
    path: '/kid',
    route: KidRoutes,
  },
  {
    path: '/tag',
    route: BarcodeRoutes,
  },
  {
    path: '/testimonial',
    route: TestimonialRoutes,
  },
  {
    path: '/promotion',
    route: PromoCodeRoutes,
  },
  {
    path: '/blogs',
    route: BlogsRoutes,
  },
  {
    path: '/tax',
    route: TaxRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payment-stripe',
    route: StripeRoutes,
  },
  {
    path: '/payments',
    route: PaymentReportRoutes,
  },
  {
    path: '/paypal',
    route: PaypalRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
