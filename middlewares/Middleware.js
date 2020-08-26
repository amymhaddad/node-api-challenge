const { orWhereNotExists } = require("../data/dbConfig")


module.exports = {
    validateProjectId,
    validateProjectContent
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