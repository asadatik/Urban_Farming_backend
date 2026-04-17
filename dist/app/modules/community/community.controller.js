"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityController = void 0;
const community_service_1 = require("./community.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
exports.communityController = {
    async getAllPosts(req, res, next) {
        try {
            const pagination = (0, pagination_1.getPagination)(req);
            const { search, tag } = req.query;
            const { posts, total } = await community_service_1.communityService.getAllPosts(pagination, search, tag);
            (0, response_1.sendSuccess)(res, 200, 'Community posts fetched.', posts, {
                page: pagination.page, limit: pagination.limit, total,
            });
        }
        catch (err) {
            next(err);
        }
    },
    async getPostById(req, res, next) {
        try {
            const post = await community_service_1.communityService.getPostById(req.params.id);
            (0, response_1.sendSuccess)(res, 200, 'Post fetched.', post);
        }
        catch (err) {
            next(err);
        }
    },
    async createPost(req, res, next) {
        try {
            const post = await community_service_1.communityService.createPost(req.user.userId, req.body);
            (0, response_1.sendSuccess)(res, 201, 'Post created.', post);
        }
        catch (err) {
            next(err);
        }
    },
    async updatePost(req, res, next) {
        try {
            const post = await community_service_1.communityService.updatePost(req.params.id, req.user.userId, req.user.role, req.body);
            (0, response_1.sendSuccess)(res, 200, 'Post updated.', post);
        }
        catch (err) {
            next(err);
        }
    },
    async deletePost(req, res, next) {
        try {
            const result = await community_service_1.communityService.deletePost(req.params.id, req.user.userId, req.user.role);
            (0, response_1.sendSuccess)(res, 200, 'Post deleted.', result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=community.controller.js.map