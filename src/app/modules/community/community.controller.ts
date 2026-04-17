
import { Request, Response, NextFunction } from 'express';
import { communityService } from './community.service';
import { sendSuccess } from '../../utils/response';
import { getPagination } from '../../utils/pagination';

export const communityController = {
  async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const pagination = getPagination(req);
      const { search, tag } = req.query as { search?: string; tag?: string };
      const { posts, total } = await communityService.getAllPosts(pagination, search, tag);
      sendSuccess(res, 200, 'Community posts fetched.', posts, {
        page: pagination.page, limit: pagination.limit, total,
      });
    } catch (err) { next(err); }
  },

  async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const post = await communityService.getPostById(req.params.id);
      sendSuccess(res, 200, 'Post fetched.', post);
    } catch (err) { next(err); }
  },

  async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const post = await communityService.createPost(req.user!.userId, req.body);
      sendSuccess(res, 201, 'Post created.', post);
    } catch (err) { next(err); }
  },

  async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const post = await communityService.updatePost(
        req.params.id, req.user!.userId, req.user!.role, req.body
      );
      sendSuccess(res, 200, 'Post updated.', post);
    } catch (err) { next(err); }
  },

  async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await communityService.deletePost(
        req.params.id, req.user!.userId, req.user!.role
      );
      sendSuccess(res, 200, 'Post deleted.', result);
    } catch (err) { next(err); }
  },
};
