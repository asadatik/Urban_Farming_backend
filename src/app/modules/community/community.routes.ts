
import { Router } from 'express';
import { communityController } from './community.controller';
import { authenticate } from '../../middlewares/auth.middleware';


const router = Router();

// Public
router.get('/', communityController.getAllPosts);
router.get('/:id', communityController.getPostById);

// Authenticated 
router.post('/', authenticate, communityController.createPost);
router.patch('/:id', authenticate, communityController.updatePost);
router.delete('/:id', authenticate, communityController.deletePost);

export default router;
