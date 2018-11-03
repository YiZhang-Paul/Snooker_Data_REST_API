const controller = require('../../controllers/player');
const playerModel = require('../../models/player');
const expect = require('chai').expect;
const sinon = require('sinon');

context('player controller test', () => {

    describe('show player records', () => {

        let req;
        let res;
        let queryAllStub;
        let queryByIdStub;

        beforeEach('mock request/response and create stubs for models', () => {

            req = {};
            res = {

                json: sinon.stub(),
                sendStatus: sinon.stub()
            };

            queryAllStub = sinon.stub(playerModel, 'queryAll');
            queryByIdStub = sinon.stub(playerModel, 'queryById');
        });

        it('allPlayers() should return player records in JSON format on successful query', done => {

            const result = { id: 1, first: 'John', last: 'Doe' };
            queryAllStub.resolves(result);

            controller.allPlayers(req, res).then(() => {

                expect(res.json.calledOnceWith(result)).to.be.true;

            }).then(done, done);
        });

        it('allPlayers() should return status code 500 when failed to retrieve data', done => {

            queryAllStub.rejects();

            controller.allPlayers(req, res).then(() => {

                expect(res.sendStatus.calledOnceWith(500)).to.be.true;

            }).then(done, done);
        });

        it('playerById() should return player record in JSON format with valid player id', done => {

            const id = 5;
            const result = { id, first: 'Jane', last: 'Doe' };
            req.params = { id };
            queryByIdStub.resolves([result]);

            controller.playerById(req, res).then(() => {

                expect(queryByIdStub.calledOnceWith(id)).to.be.true;
                expect(res.json.calledOnceWith(result)).to.be.true;

            }).then(done, done);
        });

        it('playerById() should return status code 400 when given id does not correspond to any player', done => {

            const id = 5000;
            req.params = { id };
            queryByIdStub.resolves([]);

            controller.playerById(req, res).then(() => {

                expect(queryByIdStub.calledOnceWith(id)).to.be.true;
                expect(res.sendStatus.calledOnceWith(400)).to.be.true;

            }).then(done, done);
        });

        it('playerById() should return status code 400 when id is missing in request body', done => {

            req.params = {}; // missing id property
            queryByIdStub.rejects();

            controller.playerById(req, res).then(() => {

                expect(queryByIdStub.calledOnceWith(undefined)).to.be.true;
                expect(res.sendStatus.calledOnceWith(400)).to.be.true;

            }).then(done, done);
        });

        it('playerById() should return status code 400 when id is not a valid number', done => {

            const id = 'invalid number';
            req.params = { id };
            queryByIdStub.rejects();

            controller.playerById(req, res).then(() => {

                expect(queryByIdStub.calledOnceWith(id)).to.be.true;
                expect(res.sendStatus.calledOnceWith(400)).to.be.true;

            }).then(done, done);
        });

        afterEach('restore model stubs', () => {

            queryAllStub.restore();
            queryByIdStub.restore();
        });
    });
});