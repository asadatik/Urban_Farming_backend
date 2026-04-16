import express from 'express';
import authRoutes from '../modules/auth/auth.routes';
import produceRoutes from '../modules/produce/produce.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/produce',
    route: produceRoutes,

  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;