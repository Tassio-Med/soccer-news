import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  static async getAll(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getLeaderboard();

    res.status(200).json(leaderboard);
  }

  static async getByHomeMatches(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getHomeLeaderboard();

    res.status(200).json(leaderboard);
  }

  static async getByAwayMatches(_req: Request, res: Response) {
    const leaderboard = await LeaderboardService.getAwayLeaderboard();

    res.status(200).json(leaderboard);
  }
}
