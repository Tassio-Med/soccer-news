import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import App from '../app';
import Match from '../database/models/MatchModel';
import User from '../database/models/UserModel';
import users from './mocks/login';
import matches, { matchesWithInProgressIsFalse, matchesWithInProgressIsTrue, newMatch } from './mocks/matches';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('teste de Matches', () => {
  let chaiHttpResponse: Response;

  afterEach(sinon.restore)

  it('requisição GET para /matches', async () => {
    sinon.stub(Match, "findAll").resolves(matches as unknown as Match[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches)
  });

  it('requisição GET para /matches?inProgress=true', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsTrue as unknown as Match[]);
    
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsTrue)
  });

  it('requisição GET para /matches?inProgress=false', async () => {
    sinon.stub(Match, "findAll").resolves(matchesWithInProgressIsFalse as unknown as Match[]);
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matchesWithInProgressIsFalse)
  });

  it('requisição POST para /matches', async () => {
    sinon.stub(User, "findOne").resolves(users[0] as User)
    sinon.stub(Match, "create").resolves(newMatch as unknown as Match);
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const match = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(201);
    expect(match.body).to.be.deep.equal(newMatch)
  });

  it('requisição POST para /matches com times iguais', async () => {
    sinon.stub(User, "findOne").resolves(users[0] as User)
    sinon.stub(Match, "create").resolves(matches[0] as unknown as Match);
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const match = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeam: 8,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(422);
    expect(match.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" })
  });

  it('requisição POST para /matches com time inexistente', async () => {
    sinon.stub(User, "findOne").resolves(users[0] as User)
    sinon.stub(Match, "findOne").resolves(null);
    
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const match = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', chaiHttpResponse.body.token)
      .send({
        homeTeam: 999,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(404);
    expect(match.body).to.be.deep.equal({ message: "There is no team with such id!" })
  });

  it('requisição POST para /matches sem token', async () => {
    const match = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(401);
    expect(match.body).to.be.deep.equal({ message: "Token must be a valid token" })
  });

  it('requisição PATCH para /matches/49/finish', async () => {
    sinon.stub(Match, "update").resolves([1]);

    const match = await chai
      .request(app)
      .patch('/matches/49/finish')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(200);
    expect(match.body).to.be.deep.equal({ message: "Finished" })
  });

  it('requisição PATCH para /matches/49/finish', async () => {
    sinon.stub(Match, "update").resolves([1]);

    const match = await chai
      .request(app)
      .patch('/matches/49')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 2,
      });

    expect(match.status).to.be.equal(200);
    expect(match.body).to.be.deep.equal({ message: "Updated" })
  });
});
