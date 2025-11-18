import { Router } from "express";
import { signupvalidation, loginvalidation } from "../middlewares/validation.js";
import { signup, login } from '../controllers/authController.js';


const router = Router();
router.post('/signup', signupvalidation, signup);
router.post('/login', loginvalidation, login);


export default router;