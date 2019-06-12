require('should');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../index');

describe('Api Health test', () => {
  it('should GET 200', (done) => {
    chai
      .request(server)
      .get('/api/students')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
});