import mongoose from 'mongoose';
import User from '../../../resources/v1/user/user.model';

describe('User Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL ?? '');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new user', async () => {
        const user = new User({ name: 'John Doe', email: 'john@example.com', password: 'password123' });
        const savedUser = await user.save();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('John Doe');
    });

    // Add more test cases as needed
});