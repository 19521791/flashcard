import mongoose from 'mongoose';

const dbUrl = process.env.MONGODB_URL;


export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
};

