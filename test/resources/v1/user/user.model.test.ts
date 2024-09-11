import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../../../src/resources/v1/user/user.model';   

let mongoServer: MongoMemoryServer;

describe('User Model', () => {
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
        const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('John Doe');
    });

    // Add more test cases as needed
});