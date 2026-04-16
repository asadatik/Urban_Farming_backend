import { Server } from 'http';
import app from './app';
import { config } from './config/env';

let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log(`🚀 Server ready at: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Server start failed:', error);
  }
}

bootstrap();

// Safety for unhandled errors
process.on('unhandledRejection', (err) => {
  console.log('Shutting down due to unhandled rejection...');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});