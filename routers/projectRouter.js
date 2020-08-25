const express = require('express');
router = express.Router();

const Project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');
const {
	validateProjectId,
	validateProjectUpdate,
	validateProjectContent,
	validateAction,
	handleErrors
} = require('../middlewares/Middleware');

//Get all projects
router.get('/', (req, res, next) => {
	Project.get()
		.then((projects) => {
			return res.status(200).json(projects);
		})
		.catch((err) => next(err));
});

//Get a particular project
router.get('/:projectId', [ validateProjectId, handleErrors ], (req, res, next) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) return res.status(404).json({ error: 'Project id is not found.' });
			return res.status(200).json(project);
		})
		.catch((err) => next(err));
});

//Update a project
router.put('/:projectId', [ validateProjectId, validateProjectUpdate, handleErrors ], (req, res) => {
	Project.update(req.params.projectId, req.body)
		.then((updatedProject) => {
			if (!updatedProject) return res.status(404).json({ error: 'Project id is not found' });
			return res.status(201).json(updatedProject);
		})
		.catch((err) => next(err));
});

//Add a new project
router.post('/', validateProjectContent, (req, res) => {
	Project.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => next(err));
});

//Delete a project
router.delete('/:projectId', validateProjectId, (req, res) => {
	Project.remove(req.params.projectId)
		.then((count) => {
			if (!count) return res.status(404).json({ error: 'Project id is not found' });
			return res.sendStatus(204);
		})
		.catch((err) => next(err));
});

router.get('/:projectId/actions', validateProjectId, (req, res) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) return res.status(404).json({ error: 'Project id is not found' });
			Action.get().then((actions) => {
				res.status(200).json(actions);
			});
		})
		.catch((err) => next(err));
});

router.post('/:projectId/actions', [ validateProjectId, validateAction ], (req, res) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) return res.status(404).json({ error: 'Project id is not found' });
			Action.insert(req.body, req.params.projectId).then((action) => {
				return res.status(201).json(action);
			});
		})
		.catch((err) => next(err));
});

module.exports = router;
