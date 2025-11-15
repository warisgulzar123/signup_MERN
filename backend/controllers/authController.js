import bcrypt from 'bcryptjs';
import Usermodel from '../models/userModel.js';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new Usermodel({
      username,
      email,
      password: hashedPassword
    });

    // Save user to MongoDB
    await newUser.save();

    res.status(201).json({ message: 'User signed up successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};
