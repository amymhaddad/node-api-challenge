const express = require('express');

router = express.Router();

const Action = require('../data/helpers/actionModel');
const { validateActionId, validateActionUpdate } = require('../middlewares/Middleware');

//Get an array of actions
router.get('/', (req, res) => {
	Action.get()
		.then((action) => {
			return res.status(200).json(action);
		})
		.catch((error) => {
			return res.status(500).json({ message: 'Server error' });
		});
});

//Get specific action
router.get('/:actionId', validateActionId, (req, res) => {
	Action.get(req.params.actionId)
		.then((action) => {
			if (!action) return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(200).json(action);
		})
		.catch((error) => {
			return res.status(500).json({ message: 'Server error' });
		});
});

//Update an action
router.put('/:actionId', [ validateActionId, validateActionUpdate ], (req, res) => {
	Action.update(req.params.actionId, req.body)
		.then((updatedAction) => {
			if (!updatedAction) return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(201).json(updatedAction);
		})
		.catch((error) => {
			return res.status(500).json({ message: 'Server error' });
		});
});

//delete an action
router.delete('/:actionId', validateActionId, (req, res) => {
	Action.remove(req.params.actionId)
		.then((count) => {
			if (!count) return res.status(404).json({ error: 'Action id is not found.' });
			return res.status(204).json('removed');
		})
		.catch((error) => {
			return res.status(500).json({ message: 'Server error' });
		});
});

module.exports = router;
