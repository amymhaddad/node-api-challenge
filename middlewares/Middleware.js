const { orWhereNotExists } = require("../data/dbConfig")


module.exports = {
    validateProjectId
}

function validateProjectId(req, res, next) {
    const projectId = req.params.projectId
    if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }
    next()
}

