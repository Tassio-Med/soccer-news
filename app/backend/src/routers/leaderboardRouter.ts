import * as express from 'express';
import Leaderboard from '../controllers/LeaderboardController';

const router = express.Router();

router.get('/', (req, res) => Leaderboard.getAll(req, res));
router.get('/home', (req, res) => Leaderboard.getByHomeMatches(req, res));
router.get('/away', (req, res) => Leaderboard.getByAwayMatches(req, res));

export default router;
