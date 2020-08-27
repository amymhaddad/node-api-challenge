// const { orWhereNotExists } = require("../data/dbConfig")


module.exports = {
    validateProjectId,
    validateProjectContent, 
    validateAction
}

function validateProjectId(req, res, next) {
    const projectId = req.params.projectId
    if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }
    next()
}

function validateProjectContent(req, res, next) {
    const name = req.body.name
    const description = req.body.description

    if (!name || !description) {
        return res.status(400).json({ message: "The name and description are required fields."})
    }
    next()
}

function validateAction(req, res, next) {
    const missingActionDetails = !req.body.project_id || !req.body.notes || !req.body.description

    if (missingActionDetails) {
        return res.status(404).json({ error: "You must provide notes, project id, and a description"})
    }
    next()
}