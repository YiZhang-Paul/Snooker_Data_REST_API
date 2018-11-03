const playerModel = require('../../models/player');
const PlayerMongooseModel = require('mongoose_model').Player;
const expect = require('chai').expect;
const sinon = require('sinon');

context('player mongoose model test', () => {

    describe('querying records', () => {

        let findStub;

        beforeEach('set up find stub', () => {

            findStub = sinon.stub(PlayerMongooseModel, 'find');
        });

        it('queryAll() should retrieve all players in database', () => {

            playerModel.queryAll();

            expect(findStub.calledOnceWith({})).to.be.true;
        });

        it('queryById() should retrieve players with matching id', () => {

            const id = 5;
            playerModel.queryById(id);

            expect(findStub.calledOnceWith({ player_id: id })).to.be.true;
        });

        afterEach('restore find stub', () => {

            findStub.restore();
        });
    });
});