
import { Prisma } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import { AppError } from '../../utils/AppError';
import { PaginationParams } from '../../utils/pagination';

export const communityService = {
  async getAllPosts(pagination: PaginationParams, search?: string, tag?: string) {
    const where: Prisma.CommunityPostWhereInput = {
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { postContent: { contains: search, mode: 'insensitive' } },
        ],
      }),
      ...(tag && { tags: { has: tag } }),
    };

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        skip: pagination.skip,
        take: pagination.limit,
        orderBy: { postDate: 'desc' },
        include: {
          user: { select: { id: true, name: true, role: true } },
        },
      }),
      prisma.communityPost.count({ where }),
    ]);
    return { posts, total };
  },

  async getPostById(id: string) {
    const post = await prisma.communityPost.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, role: true } } },
    });
    if (!post) throw new AppError('Post not found.', 404);
    return post;
  },

  async createPost(userId: string, data: { title: string; postContent: string; tags?: string[] }) {
    return prisma.communityPost.create({
      data: { userId, title: data.title, postContent: data.postContent, tags: data.tags ?? [] },
      include: { user: { select: { id: true, name: true } } },
    });
  },

  async updatePost(id: string, userId: string, role: string, data: { title?: string; postContent?: string; tags?: string[] }) {
    const post = await prisma.communityPost.findUnique({ where: { id } });
    if (!post) throw new AppError('Post not found.', 404);
    if (post.userId !== userId && role !== 'ADMIN')
      throw new AppError('You can only edit your own posts.', 403);
    return prisma.communityPost.update({ where: { id }, data });
  },

  async deletePost(id: string, userId: string, role: string) {
    const post = await prisma.communityPost.findUnique({ where: { id } });
    if (!post) throw new AppError('Post not found.', 404);
    if (post.userId !== userId && role !== 'ADMIN')
      throw new AppError('You can only delete your own posts.', 403);
    await prisma.communityPost.delete({ where: { id } });
    return { id };
  },
};
