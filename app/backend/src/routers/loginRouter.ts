import * as express from 'express';
import LoginController from '../controllers/LoginController';
import authMiddleware from '../middlewares/authMiddleware';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = express.Router();

router.post('/', loginMiddleware, (req, res) => LoginController.login(req, res));
router.get('/validate', authMiddleware, (req, res) => LoginController.validate(req, res));

export default router;
