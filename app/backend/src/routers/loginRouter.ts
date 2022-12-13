import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import loginMiddleware from '../middlewares/loginMiddleware';

const router = Router();

router.use('/', loginMiddleware, (req: Request, res: Response) => LoginController.login(req, res));

export default router;
