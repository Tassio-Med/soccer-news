import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const teams = await TeamService.getAllTeams();

    res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const team = await TeamService.getTeamById(Number(req.params.id));

    res.status(200).json(team);
  }
}
