import MatchModel from '../database/models/MatchModel';
import IGoals from '../interfaces/IGoals';
import IMatch from '../interfaces/IMatch';

export default class MatchService {
  static async getAllMatches(): Promise<IMatch[]> {
    const matches: IMatch[] = await MatchModel.findAll({
      include: {
        all: true,
        attributes: {
          exclude: ['id'],
        },
      },
    });

    return matches;
  }

  static async getAllMatchesWithQueryParams(inProgress: boolean): Promise<IMatch[]> {
    const matches: IMatch[] = await MatchModel.findAll({
      where: { inProgress },
      include: {
        all: true,
        attributes: {
          exclude: ['id'],
        },
      },
    });

    return matches;
  }

  static async createMatch(match: IMatch): Promise<IMatch> {
    const newMatch: IMatch = await MatchModel.create({ ...match });

    return newMatch;
  }

  static async updateMatch(id: number, goals: IGoals): Promise<void> {
    await MatchModel.update(goals, { where: { id } });
  }

  static async finishMatch(id: number): Promise<void> {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }
}
