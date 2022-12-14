import IMatch from '../interfaces/IMatch';
import IStat from '../interfaces/IStats';
import ITeam from '../interfaces/ITeam';

const getAwayData = (awayMatches: IMatch[]) => {
  let points = 0;
  let losses = 0;
  let victories = 0;
  let drawns = 0;

  awayMatches.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) { points += 3; victories += 1; }
    if (match.awayTeamGoals === match.homeTeamGoals) { points += 1; drawns += 1; }
    if (match.awayTeamGoals < match.homeTeamGoals) losses += 1;
  });

  return { points, losses, victories, drawns };
};

const getHomeData = (homeMatches: IMatch[]) => {
  let points = 0;
  let losses = 0;
  let victories = 0;
  let drawns = 0;

  homeMatches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) { points += 3; victories += 1; }
    if (match.homeTeamGoals === match.awayTeamGoals) { points += 1; drawns += 1; }
    if (match.homeTeamGoals < match.awayTeamGoals) losses += 1;
  });

  return { points, losses, victories, drawns };
};

const getData = (homeMatches: IMatch[], awayMatches: IMatch[]) => {
  const homeData = getHomeData(homeMatches);
  const awayData = getAwayData(awayMatches);

  return {
    points: homeData.points + awayData.points,
    losses: homeData.losses + awayData.losses,
    victories: homeData.victories + awayData.victories,
    drawns: homeData.drawns + awayData.drawns,
  };
};

const countAwayGoals = (awayMatches: IMatch[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  awayMatches.forEach((match) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  });

  return { goalsFavor, goalsOwn };
};

const countHomeGoals = (homeMatches: IMatch[]) => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  homeMatches.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  return { goalsFavor, goalsOwn };
};

const countGoals = (homeMatches: IMatch[], awayMatches: IMatch[]) => {
  const homeGoals = countHomeGoals(homeMatches);
  const awayGoals = countAwayGoals(awayMatches);

  return {
    goalsFavor: homeGoals.goalsFavor + awayGoals.goalsFavor,
    goalsOwn: homeGoals.goalsOwn + awayGoals.goalsOwn,
  };
};

const generateTeamStats = (team: ITeam, matches: IMatch[]): IStat => {
  const homeMatches = matches.filter((match) => match.homeTeam === team.id);
  const awayMatches = matches.filter((match) => match.awayTeam === team.id);
  const filtredMatches = [...awayMatches, ...homeMatches];
  const { points, drawns, losses, victories } = getData(homeMatches, awayMatches);
  const { goalsFavor, goalsOwn } = countGoals(homeMatches, awayMatches);
  return {
    name: team.teamName,
    totalPoints: points,
    totalGames: filtredMatches.length,
    totalVictories: victories,
    totalDraws: drawns,
    totalLosses: losses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((points / (filtredMatches.length * 3)) * 100).toFixed(2)),
  };
};

const homeTeamStats = (team: ITeam, matches: IMatch[]): IStat => {
  const homeMatches = matches.filter((match) => match.homeTeam === team.id);
  const { points, drawns, losses, victories } = getHomeData(homeMatches);
  const { goalsFavor, goalsOwn } = countHomeGoals(homeMatches);
  return {
    name: team.teamName,
    totalPoints: points,
    totalGames: homeMatches.length,
    totalVictories: victories,
    totalDraws: drawns,
    totalLosses: losses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((points / (homeMatches.length * 3)) * 100).toFixed(2)),
  };
};

const awayTeamStats = (team: ITeam, matches: IMatch[]): IStat => {
  const awayMatches = matches.filter((match) => match.awayTeam === team.id);
  const { points, drawns, losses, victories } = getAwayData(awayMatches);
  const { goalsFavor, goalsOwn } = countAwayGoals(awayMatches);
  return {
    name: team.teamName,
    totalPoints: points,
    totalGames: awayMatches.length,
    totalVictories: victories,
    totalDraws: drawns,
    totalLosses: losses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: Number(((points / (awayMatches.length * 3)) * 100).toFixed(2)),
  };
};

export default generateTeamStats;
export { awayTeamStats, homeTeamStats };
