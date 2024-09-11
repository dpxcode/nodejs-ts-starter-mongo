import express, { Application } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import startup from './src/startup';
import routes from './src/startup/routes';
import initializeModels from './src/startup/models'; // Import the model initialization function
import errorMiddleware from './src/middlewares/v1/error';

dotenv.config();

const app: Application = express();
const server = http.createServer(app);

// Initialize startup modules
startup(app);

server.listen(process.env.PORT, async () => {
    // Initialize models
    await initializeModels();

    // Initialize routes
    await routes(app);

    // Initialize error middleware
    app.use(errorMiddleware);
    
    console.log('listening on port: ', process.env.PORT);
});