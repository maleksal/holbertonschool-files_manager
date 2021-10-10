import express from 'express';
import AppController from '../controllers/AppController';
import UserController from '../controllers/UsersController';

const router = express.Router();

router.get('/status', AppController.Status);
router.get('/stats', AppController.Stats);
router.post('/users', UserController.postNew);

export default router;
