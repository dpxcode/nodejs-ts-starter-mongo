import mongoose from 'mongoose';
import { createUser } from '../../../resources/v1/user/user.resource';
import User from '../../../resources/v1/user/user.model';

describe('User Resource', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL ?? '');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const user = await createUser(userData);
        expect(user._id).toBeDefined();
        expect(user.name).toBe('John Doe');
    });

    // Add more test cases as needed
});