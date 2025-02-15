import express from 'express';
import AuthController from '../../controllers/authController.js';

const router = express.Router();
const authController = new AuthController();


router.post('/registrar', authController.registrar);
router.post('/login', authController.login);


export {router};