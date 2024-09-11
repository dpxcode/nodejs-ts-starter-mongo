import User from './user.model'; // Ensure the correct path to your user model

/**
 * create user 
 */
export const createUser = async (data: { name: string; email: string; password: string }) => {
    try {
        // Create new user
        const user = new User(data);
        await user.save();

        return user;
    } catch (error : any) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

/**
 * find user by email   
 */
export const findUserByEmail = async (email: string) => {
    try {
        const user = await User.findOne({ email });   
        return user;                
    } catch (error : any) {        
        throw new Error(`Error finding user: ${error.message}`);    
    }
};          