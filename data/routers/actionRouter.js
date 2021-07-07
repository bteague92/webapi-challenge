const express = require('express');

const router = express.Router();

const actions = require("./../helpers/actionModel.js")
const projects = require("./../helpers/projectModel.js")

router.get('/', (req, res) => {
    actions.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Server error',
            });
        });
});

router.post('/', (req, res) => {
    actions.insert(req.body)
        .then(action => {
            if (action.id) {
                res.status(200).json(action);
            } else {
                res.status(400).json({
                    message: "invalid project id"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" })
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    actions.update(id, changes)
        .then(action => {
            if (action) {
                res.status(200).json(action)
            } else {
                res.status(404).json({
                    message: "Thats not a valid action id"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "server error"
            })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actions.remove(id)
        .then(action => {
            if (action) {
                res.status(200).json({ message: 'Action nuked' });
            } else {
                res.status(404).json({ message: 'invalid action' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'server error',
            });
        });
});

module.exports = router;