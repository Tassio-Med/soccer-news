import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = Router();
const loginController = new LoginController();

router.use('/', loginMiddleware, (req: Request, res: Response) => loginController.login(req, res));

export default router;
