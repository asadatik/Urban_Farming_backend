"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const community_controller_1 = require("./community.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Public
router.get('/', community_controller_1.communityController.getAllPosts);
router.get('/:id', community_controller_1.communityController.getPostById);
// Authenticated 
router.post('/', auth_middleware_1.authenticate, community_controller_1.communityController.createPost);
router.patch('/:id', auth_middleware_1.authenticate, community_controller_1.communityController.updatePost);
router.delete('/:id', auth_middleware_1.authenticate, community_controller_1.communityController.deletePost);
exports.default = router;
//# sourceMappingURL=community.routes.js.map