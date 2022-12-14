import IStat from '../interfaces/IStats';
import generateTeamStats, { awayTeamStats, homeTeamStats } from '../utils/leaderboard';
import MatchService from './MatchSevice';
import TeamService from './TeamService';

export default class LeaderboardService {
  static sortLeaderboard(a: IStat, b: IStat) {
    return b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsFavor;
  }

  static async getLeaderboard(): Promise<IStat[]> {
    const matches = await MatchService.getAllMatchesWithQueryParams(false);
    const teams = await TeamService.getAllTeams();

    const leaderboard: IStat[] = teams.map((team) => generateTeamStats(team, matches));

    return leaderboard.sort(LeaderboardService.sortLeaderboard);
  }

  static async getHomeLeaderboard(): Promise<IStat[]> {
    const matches = await MatchService.getAllMatchesWithQueryParams(false);
    const teams = await TeamService.getAllTeams();

    const leaderboard: IStat[] = teams.map((team) => homeTeamStats(team, matches));

    return leaderboard.sort(LeaderboardService.sortLeaderboard);
  }

  static async getAwayLeaderboard(): Promise<IStat[]> {
    const matches = await MatchService.getAllMatchesWithQueryParams(false);
    const teams = await TeamService.getAllTeams();

    const leaderboard: IStat[] = teams.map((team) => awayTeamStats(team, matches));

    return leaderboard.sort(LeaderboardService.sortLeaderboard);
  }
}
