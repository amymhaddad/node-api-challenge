const express = require('express');
const projectRouter = express.Router();
//Watch for naming conflicts so my router doesn't get overwritten

const Project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');
const {
	validateProjectId,
	validateProjectUpdate,
	validateProjectContent,
	validateAction
} = require('../middlewares/Middleware');


projectRouter.get('/', (req, res, next) => {
	Project.get()
		.then((projects) => {
			return res.status(200).json(projects);
		})
		.catch(err => next(err))
});

//Get a particular project
projectRouter.get('/:projectId', validateProjectId, (req, res, next) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) return res.status(404).json({ error: 'Project id is not found.' });
				return res.status(200).json(project);
		})
		.catch(err => next(err))
});

//Update a project
projectRouter.put('/:projectId', [ validateProjectId, validateProjectUpdate ], (req, res, next) => {
	Project.update(req.params.projectId, req.body)
		.then((updatedProject) => {
			if (!updatedProject) return res.status(404).json({ error: 'Project id is not found' });
			return res.status(201).json(updatedProject);
		})
		.catch(err => next(err))
});

//Add a new project
projectRouter.post('/', validateProjectContent, (req, res, next) => {
	Project.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch(err => next(err))
});

//Delete a project
projectRouter.delete('/:projectId', validateProjectId, (req, res, next) => {
	Project.remove(req.params.projectId)
		.then((count) => {
			if (!count) return res.status(404).json({ error: 'Project id is not found' });
			return res.sendStatus(204);
		})
		.catch(err => next(err))
});

projectRouter.get('/:projectId/actions', validateProjectId, (req, res, next) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) 
				return res.status(404).json({ error: 'Project id is not found' });
			Action.get().then((actions) => {
				res.status(200).json(actions);
			});
		})
		.catch(err => next(err))
});

//project_id MUST be part of the body, which seems strange?
//I must include the project_id in order to add a new action for a project. But that seems strange bc the project_id comes through the url
projectRouter.post('/:projectId/actions', [ validateProjectId, validateAction ], (req, res, next) => {
	const projectId = req.params.id 
	const actionBody = req.body
	const newAction = {projectId, actionBody}
	console.log("body", newAction)

	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) 
				return res.status(404).json({ error: 'Project id is not found' });
			Action.insert(req.body, req.params.projectId)
				.then((action) => {
				return res.status(201).json(action);
			});
		})
		.catch(err => next(err))
});


module.exports = projectRouter;
