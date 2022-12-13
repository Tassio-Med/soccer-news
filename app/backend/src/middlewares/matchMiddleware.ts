import { NextFunction, Request, Response } from 'express';
import TeamModel from '../database/models/TeamModel';

export default async function matchMiddleware(req: Request, res: Response, next: NextFunction) {
  const data = req.body;

  if (data.homeTeam === data.awayTeam) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  const homeTeam = await TeamModel.findOne({ where: { id: data.homeTeam } });
  const awayTeam = await TeamModel.findOne({ where: { id: data.awayTeam } });

  if (!homeTeam || !awayTeam) {
    return res.status(404).json(
      { message: 'There is no team with such id!' },
    );
  }

  next();
}
