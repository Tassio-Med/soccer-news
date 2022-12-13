import * as chai from 'chai';
import { Response } from 'superagent';
import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('teste do login', () => {

  let chaiHttpResponse: Response;

  it('testando sem email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: '', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('testando sem senha', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: '' });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "All fields must be filled" });
  });

  it('testando com email errado', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'user@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });

  it('testando com senha errada', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: 'secret_user' });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: "Incorrect email or password" });
  });

  it('testando corretamente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: 'secret_admin' });

    expect(chaiHttpResponse.status).to.be.equal(200);

    const role = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', chaiHttpResponse.body.token);

    expect(role.body).to.deep.equal({ role: 'admin' })
  });

});