"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityService = void 0;
const prisma_1 = require("../../utils/prisma");
const AppError_1 = require("../../utils/AppError");
exports.communityService = {
    async getAllPosts(pagination, search, tag) {
        const where = {
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { postContent: { contains: search, mode: 'insensitive' } },
                ],
            }),
            ...(tag && { tags: { has: tag } }),
        };
        const [posts, total] = await Promise.all([
            prisma_1.prisma.communityPost.findMany({
                where,
                skip: pagination.skip,
                take: pagination.limit,
                orderBy: { postDate: 'desc' },
                include: {
                    user: { select: { id: true, name: true, role: true } },
                },
            }),
            prisma_1.prisma.communityPost.count({ where }),
        ]);
        return { posts, total };
    },
    async getPostById(id) {
        const post = await prisma_1.prisma.communityPost.findUnique({
            where: { id },
            include: { user: { select: { id: true, name: true, role: true } } },
        });
        if (!post)
            throw new AppError_1.AppError('Post not found.', 404);
        return post;
    },
    async createPost(userId, data) {
        return prisma_1.prisma.communityPost.create({
            data: { userId, title: data.title, postContent: data.postContent, tags: data.tags ?? [] },
            include: { user: { select: { id: true, name: true } } },
        });
    },
    async updatePost(id, userId, role, data) {
        const post = await prisma_1.prisma.communityPost.findUnique({ where: { id } });
        if (!post)
            throw new AppError_1.AppError('Post not found.', 404);
        if (post.userId !== userId && role !== 'ADMIN')
            throw new AppError_1.AppError('You can only edit your own posts.', 403);
        return prisma_1.prisma.communityPost.update({ where: { id }, data });
    },
    async deletePost(id, userId, role) {
        const post = await prisma_1.prisma.communityPost.findUnique({ where: { id } });
        if (!post)
            throw new AppError_1.AppError('Post not found.', 404);
        if (post.userId !== userId && role !== 'ADMIN')
            throw new AppError_1.AppError('You can only delete your own posts.', 403);
        await prisma_1.prisma.communityPost.delete({ where: { id } });
        return { id };
    },
};
//# sourceMappingURL=community.service.js.map