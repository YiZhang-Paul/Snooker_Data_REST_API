const models = require('../models');

exports.allPlayers = (req, res) => {

    return models.Player
        .queryAll()
        .then(result => res.json(result))
        .catch(() => res.sendStatus(500));
}

exports.playerById = (req, res) => {

    return models.Player
        .queryById(req.params.id)
        .then(result => {

            if (result.length === 0) {

                throw new Error('No player found.');
            }

            res.json(result[0]);
        })
        .catch(() => res.sendStatus(400));
}