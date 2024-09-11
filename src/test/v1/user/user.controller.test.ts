import request from 'supertest';
import express, { Application } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import startup from '../../../startup';
import routes from '../../../startup/routes';
import initializeModels from '../../../startup/models';
import errorMiddleware from '../../../middlewares/v1/error';

dotenv.config();

let app: Application;
let server: http.Server;

beforeAll(async () => {
    app = express();
    server = http.createServer(app);

    // Initialize startup modules
    startup(app);

    // Initialize models
    await initializeModels();

    // Initialize routes
    await routes(app);

    // Initialize error middleware
    app.use(errorMiddleware);

    server.listen(process.env.PORT);
});

afterAll((done) => {
    server.close(done);
});

describe('User Controller', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        expect(response.status).toBe(201);
        expect(response.body.user).toHaveProperty('name', 'John Doe');
    });

    // Add more test cases as needed
});