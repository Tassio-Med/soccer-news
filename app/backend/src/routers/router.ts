import { Router } from 'express';
import loginRouter from './loginRouter';

const router = Router();

router.use('/login', loginRouter);

export default router;
