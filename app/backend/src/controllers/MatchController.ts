import { Request, Response } from 'express';
import MatchService from '../services/MatchSevice';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const matches = await MatchService.getAllMatchesWithQueryParams(inProgress === 'true');

      return res.status(200).json(matches);
    }

    const matches = await MatchService.getAllMatches();

    res.status(200).json(matches);
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const data = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true };
    const match = await MatchService.createMatch(data);

    res.status(201).json(match);
  }

  static async updateMatch(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchService.updateMatch(Number(req.params.id), { homeTeamGoals, awayTeamGoals });

    res.status(200).json({ message: 'Updated' });
  }

  static async finishMatch(req: Request, res: Response) {
    await MatchService.finishMatch(Number(req.params.id));

    res.status(200).json({ message: 'Finished' });
  }
}
