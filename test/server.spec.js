const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex')

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return a home page', (done) => {
    chai.request(server)
    .get('/')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.html;
      done();
    })
  })
})

describe('API Routes', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      return knex.migrate.latest()
    })
    .then(() => {
      return knex.seed.run()
    })
    .then(() => {
          done();
    });
  });

  describe('GET ideas', () => {
    it('should return all ideas', (done) => {
      chai.request(server)
      .get('/ideas')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Dude');
        done()
      })
    })
  })

  describe('POST idea', () => {
    it('should add an idea to the database', (done) => {
      chai.request(server)
      .post('/ideas')
      .send({title: 'oh', body: 'yeah'})
      .end((err, response) => {
        response.should.have.status(201);
        response.body.id.should.equal(3);
        done();
      })
    })
    it('should not post if params are missing', (done) => {
      chai.request(server)
      .post('/ideas')
      .send({title: 'oh'})
      .end((err, response) => {
        response.should.have.status(422);
        done()
      })
    })
  })

  describe('DELETE idea', () => {
    it('should delete an idea from the database', (done) => {
      chai.request(server)
      .delete('/ideas/1')
      .end((err, response) => {
        response.should.have.status(200);
        done()
      })
    })
  })

})
