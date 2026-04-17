"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = require("./app/utils/prisma");
let server;
async function bootstrap() {
    try {
        await prisma_1.prisma.$connect();
        console.log(' Database connected successfully');
        server = app_1.default.listen(env_1.config.port, () => {
            console.log(` Server ready at: http://localhost:${env_1.config.port}`);
        });
    }
    catch (error) {
        console.error(' Server start failed:', error);
        process.exit(1);
    }
}
bootstrap();
// Safety for unhandled errors
const exitHandler = () => {
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
process.on('uncaughtException', (error) => {
    console.log(' Uncaught Exception:', error);
    exitHandler();
});
process.on('unhandledRejection', (error) => {
    console.log(' Unhandled Rejection:', error);
    exitHandler();
});
process.on('SIGINT', async () => {
    await prisma_1.prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=server.js.map