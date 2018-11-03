const app = require('../../app');
const server = app.server;
const connection = app.connection;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

context('player routes integration test', () => {

    before('establish connection to database', done => {

        connection.on('error', error => console.log(error));
        connection.once('open', done);
    });

    describe('/api/players', () => {

        it('should return all player records in JSON format', done => {

            chai.request(server)
                .get('/api/players')
                .end((error, res) => {

                    expect(res).to.have.status(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.length).to.not.equal(0);
                    done();
                });
        });
    });

    describe('/api/players/:id', () => {

        it('should return player with given id in JSON format', done => {

            const id = 1;

            chai.request(server)
                .get(`/api/players/${id}`)
                .end((error, res) => {

                    expect(res).to.have.status(200);
                    expect(res.type).to.equal('application/json');
                    expect(res.body.player_id).to.equal(id);
                    done();
                });
        });

        it('should return status code 400 with non-existent player id', done => {

            const id = -1;

            chai.request(server)
                .get(`/api/players/${id}`)
                .end((error, res) => {

                    expect(res).to.have.status(400);
                    done();
                });
        });

        it('should return status code 400 with invalid player id', done => {

            const id = 'invalid_id';

            chai.request(server)
                .get(`/api/players/${id}`)
                .end((error, res) => {

                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    after('close database connection and server', () => {

        connection.close();
        server.close();
    });
});