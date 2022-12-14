import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import App from '../app';
import Match from '../database/models/MatchModel';
import { awayMatchesLeaderboard, homeMatchesLeaderboard, leaderboard } from './mocks/leaderboard';
import { matchesWithInProgressIsFalse } from './mocks/matches';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('teste de Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('requisição GET para /leaderboard', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(leaderboard)
  });

  it('requisição GET para /leaderboard/home', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(homeMatchesLeaderboard)
  });

  it('requisição GET para /leaderboard/away', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(awayMatchesLeaderboard)
  });
});
