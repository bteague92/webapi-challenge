const express = require('express');

const router = express.Router();

const actions = require("./../helpers/actionModel.js")
const projects = require("./../helpers/projectModel.js")

router.get('/', (req, res) => {
    projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Server error',
            });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    projects.get(id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    message: "couldnt find project with that id"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Server error',
            });
        });
});

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    projects.getProjectActions(id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions);
            } else {
                res.status(404).json({
                    message: "There are no actions for that id"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: 'Server error',
            });
        });
});

router.post('/', (req, res) => {
    projects.insert(req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "Server error" })
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    projects.update(id, changes)
        .then(project => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message: "Thats not a valid project id"
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
    projects.remove(id)
        .then(project => {
            if (project) {
                res.status(200).json({ message: 'Project nuked' });
            } else {
                res.status(404).json({ message: 'invalid project' });
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