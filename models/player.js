const PlayerMongooseModel = require('mongoose_model').Player;

exports.queryAll = () => PlayerMongooseModel.find({}, { _id: 0 });

exports.queryById = id => PlayerMongooseModel.find({ player_id: id }, { _id: 0 });