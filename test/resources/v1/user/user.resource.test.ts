import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createUser } from '../../../../src/resources/v1/user/user.resource';

let mongoServer: MongoMemoryServer;

describe('User Resource', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should create a new user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const user = await createUser(userData);
        expect(user._id).toBeDefined();
        expect(user.name).toBe('John Doe');
    });

});