const express = require('express');
const actionRouter = express.Router();

const Action = require('../data/helpers/actionModel');
const { validateActionId, validateActionUpdate, validateAction } = require('../middlewares/Middleware');

//Get an array of actions
actionRouter.get('/', (req, res, next) => {
	Action.get()
		.then((action) => {
			return res.status(200).json(action);
		})
		.catch(err => next(err))
});

//Get specific action
actionRouter.get('/:actionId', validateActionId, (req, res, next) => {
	Action.get(req.params.actionId)
		.then((action) => {
			if (!action) 
				return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(200).json(action);
		})
		.catch(err => next(err))		 
});

//Update an action
actionRouter.put('/:actionId', [ validateActionId, validateActionUpdate ], (req, res, next) => {
	Action.update(req.params.actionId, req.body)
		.then((updatedAction) => {
			if (!updatedAction) 
				return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(201).json(updatedAction);
		})
		.catch(err => next(err))		 
});

//Delete an action
actionRouter.delete('/:actionId', validateActionId, (req, res, next) => {
	Action.remove(req.params.actionId)
		.then((count) => {
			if (!count) 
				return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(204).json('removed');
		})
		.catch(err => next(err))		 
});

//Add a new action
actionRouter.post('/', validateAction, (req, res) => {
		Action.insert(req.body)
		.then(newAction => {
			return res.status(201).json(newAction)
		})
		.catch(err => next(err))		 
});

module.exports = actionRouter;
