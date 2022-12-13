import * as express from 'express';
import MatchController from '../controllers/MatchController';
import authMiddleware from '../middlewares/authMiddleware';
import matchMiddleware from '../middlewares/matchMiddleware';

const router = express.Router();

router.get('/', (req, res) => MatchController.getAll(req, res));
router.post(
  '/',
  authMiddleware,
  matchMiddleware,
  (req, res) => MatchController.createMatch(req, res),
);
router.patch('/:id', (req, res) => MatchController.updateMatch(req, res));
router.patch('/:id/finish', (req, res) => MatchController.finishMatch(req, res));

export default router;
