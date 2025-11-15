import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGO_URI || '3000';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Mongo DB connection error:', err));

export default mongoose;