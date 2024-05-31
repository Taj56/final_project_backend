import express from 'express';
import { getAllUsers, getThisUser, loginUser, protect, registerUser } from '../controller/authController.js';

export const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);

authRouter.use(protect);
authRouter.get('/all-users', getAllUsers);
authRouter.get('/my-profile', getThisUser);