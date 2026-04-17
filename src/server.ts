import { Server } from 'http';
import app from './app';
import { config } from './config/env';
import { prisma } from './app/utils/prisma';

let server: Server;

async function bootstrap() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');

    server = app.listen(config.port, () => {
      console.log(` Server ready at: http://localhost:${config.port}`);
    });
  } catch (error) {
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
  } else {
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
  await prisma.$disconnect();
  process.exit(0);
});