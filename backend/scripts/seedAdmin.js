
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Admin from '../models/adminModel.js';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            await mongoose.connection.close();
            process.exit(0);
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash('Admin@123', salt);

        // Create admin user
        const admin = new Admin({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully');
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
};

seedAdmin();
