import bcrypt from 'bcryptjs';
import Usermodel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('SIGNUP STARTED ==========');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('==============================');


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


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await Usermodel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User does not exist email or password is wrong' });
    }

   const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
   if (!isPasswordCorrect) {
     return res.status(400).json({ message: 'Invalid credentials' });
   }
   const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'User logged in successfully', 
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up user', error: error.message });
  }
};

export default { signup, login };