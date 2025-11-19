// controllers/userController.js
import Usermodel from '../models/userModel.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Usermodel.find().select('-password'); // Password exclude karen
    res.status(200).json({
      success: true,
      count: users.length,
      users: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};