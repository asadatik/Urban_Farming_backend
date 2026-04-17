import { PaginationParams } from '../../utils/pagination';
export declare const communityService: {
    getAllPosts(pagination: PaginationParams, search?: string, tag?: string): Promise<{
        posts: ({
            user: {
                name: string;
                role: import(".prisma/client").$Enums.Role;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            title: string;
            postContent: string;
            tags: string[];
            postDate: Date;
        })[];
        total: number;
    }>;
    getPostById(id: string): Promise<{
        user: {
            name: string;
            role: import(".prisma/client").$Enums.Role;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        postContent: string;
        tags: string[];
        postDate: Date;
    }>;
    createPost(userId: string, data: {
        title: string;
        postContent: string;
        tags?: string[];
    }): Promise<{
        user: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        postContent: string;
        tags: string[];
        postDate: Date;
    }>;
    updatePost(id: string, userId: string, role: string, data: {
        title?: string;
        postContent?: string;
        tags?: string[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        title: string;
        postContent: string;
        tags: string[];
        postDate: Date;
    }>;
    deletePost(id: string, userId: string, role: string): Promise<{
        id: string;
    }>;
};
//# sourceMappingURL=community.service.d.ts.map