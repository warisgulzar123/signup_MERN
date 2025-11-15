import { Router } from "express";
import { signupvalidation, loginvalidation } from "../middlewares/validation.js";
import { signup } from '../controllers/authController.js';


const router = Router();

router.post('/login',loginvalidation, (req, res) => {
  res.send('Login successful');
});

router.post('/signup',signupvalidation, signup);



export default router;