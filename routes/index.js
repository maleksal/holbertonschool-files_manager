import express from 'express';
import AppController from '../controllers/AppController';
import UserController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/status', AppController.Status);
router.get('/stats', AppController.Stats);

router.post('/users', UserController.postNew);
router.get('/users/me', UserController.me);

router.get('/connect', AuthController.connect);
router.get('/disconnect', AuthController.disconnect);

export default router;
