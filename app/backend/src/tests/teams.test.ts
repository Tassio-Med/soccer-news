import * as chai from 'chai';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import App from '../app';
import Team from '../database/models/TeamModel';
import teams from './mocks/teams';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('teste de Teams', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);
    sinon
      .stub(Team, "findOne")
      .resolves(teams[0] as Team);
  });

  after(()=>{
    (Team.findAll as sinon.SinonStub).restore();
    (Team.findOne as sinon.SinonStub).restore();
  })

  it('requisição para /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.equal(teams)
  });

  it('requisição para /teams/id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.equal(teams[0])
  });

});