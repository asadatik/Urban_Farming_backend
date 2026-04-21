import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import produceRoutes from '../modules/produce/produce.routes';
import vendorRoutes from '../modules/vendor/vendor.routes';
import trackingRoutes from '../modules/tracking/tracking.routes';
import userRoutes from '../modules/user/user.routes';
import rentalRoutes from '../modules/rental/rental.routes';
import orderRoutes from '../modules/order/order.routes';
import communityRoutes from '../modules/community/community.routes';
import certificationsRoutes from '../modules/certification/certification.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path:'/users',
    route:userRoutes,
  },
  {
    path: '/produce',
    route: produceRoutes,
  },
  {
  path: '/vendors',
  route:vendorRoutes,
  },
  {
    path: '/tracking',
    route: trackingRoutes,
  },
  {
    path:'/rentals',
    route:rentalRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/community',
    route: communityRoutes,
  },
  {
    path: '/certifications',
    route: certificationsRoutes,
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;


