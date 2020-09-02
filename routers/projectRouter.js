const express = require('express');
router = express.Router();

const Project = require('../data/helpers/projectModel');
const Action = require('../data/helpers/actionModel');
const {
	validateProjectId,
	validateProjectUpdate,
	validateProjectContent,
	validateAction
} = require('../middlewares/Middleware');

//Not working and unsure why. I get this response: "error": "Invalid syntax" which means the middleware must be runing on this endpoint, but it shouldt be 
//Get all projects
router.get('/', (req, res) => {
	console.log("HERE")
	Project.get()
		.then((projects) => {
			console.log("HERE")
			return res.status(200).json(projects);
		})
	
		.catch((error) => {
			console.log("ERR", error)
			return res.status(500).json({ error: 'Server Error' });
		});
});

//Get a particular project
router.get('/:projectId', validateProjectId, (req, res, next) => {
	console.log("HERE in second endpoint")
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) return res.status(404).json({ error: 'Project id is not found.' });
				return res.status(200).json(project);
		})
		
		// let err = new Error
		// err.statusCode = 500
		// next(err)
		// .catch((error) => {
		// 	return res.status(500).json({ error: 'Server Error' });
		// });
});

//Update a project
router.put('/:projectId', [ validateProjectId, validateProjectUpdate ], (req, res) => {
	Project.update(req.params.projectId, req.body)
		.then((updatedProject) => {
			if (!updatedProject) return res.status(404).json({ error: 'Project id is not found' });
			return res.status(201).json(updatedProject);
		})
		.catch((err) => {
			return res.status(500).json({ error: 'Server Error' });
		});
});

//Add a new project
router.post('/', validateProjectContent, (req, res) => {
	Project.insert(req.body)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) => {
			return res.status(500).json({ error: 'Server error ' });
		});
});

//Delete a project
router.delete('/:projectId', validateProjectId, (req, res) => {
	Project.remove(req.params.projectId)
		.then((count) => {
			if (!count) return res.status(404).json({ error: 'Project id is not found' });
			return res.sendStatus(204);
		})
		.catch((err) => {
			return res.status(500).json({ error: 'Server error ' });
		});
});

router.get('/:projectId/actions', validateProjectId, (req, res) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) 
				return res.status(404).json({ error: 'Project id is not found' });
			Action.get().then((actions) => {
				res.status(200).json(actions);
			});
		})
		.catch((err) => {
			return res.status(500).json({ error: 'Server error ' });
		});
});

//project_id MUST be part of the body, which seems strange?
//I must include the project_id in order to add a new action for a project. But that seems strange bc the project_id comes through the url
router.post('/:projectId/actions', [ validateProjectId, validateAction ], (req, res) => {
	Project.get(req.params.projectId)
		.then((project) => {
			if (!project) 
				return res.status(404).json({ error: 'Project id is not found' });
			Action.insert(req.body, req.params.projectId)
				.then((action) => {
				return res.status(201).json(action);
			});
		})
		.catch((error) => {
			return res.status(500).json({ message: 'Server error' });
		});
});


module.exports = router;
