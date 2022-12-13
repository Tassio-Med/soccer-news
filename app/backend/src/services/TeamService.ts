import TeamModel from '../database/models/TeamModel';
import ITeam from '../interfaces/ITeam';

export default class TeamService {
  static async getAllTeams(): Promise<ITeam[]> {
    const teams: ITeam[] = await TeamModel.findAll();

    return teams;
  }

  static async getTeamById(id:number): Promise<ITeam | null> {
    const team: ITeam | null = await TeamModel.findOne({ where: { id } });

    return team;
  }
}
