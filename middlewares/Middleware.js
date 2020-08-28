
module.exports = {
    logger,
    validateProjectId,
    validateProjectUpdate,
    validateProjectContent, 
    validateAction,
    validateActionId,
    validateActionUpdate
}


function logger(req, res, next) {
    let date = `Date: ${Date.now()}`
    let method = `Method: ${req.method}\n`
    let url = `URL: ${req.url}\n`
    console.log(date, method, url)
    next()
}

function validateProjectId(req, res, next) {
    const projectId = req.params.projectId
    
    if (isNaN(projectId)) 
        return res.status(400).json({ message: "Invalid syntax"})
    next()
}

function validateProjectUpdate(req, res, next) {
    const missingProjectContent = !req.body.name && !req.body.description

    if (missingProjectContent)
        return res.status(400).json({ error: "You need to provide a name or description."})
    next()
}

function validateProjectContent(req, res, next) {
    const missingProjectContent = !req.body.name && !req.body.description

    if (missingProjectContent) {
        return res.status(400).json({ error: "You need to provide a name and description."})
    }
    next()
}


function validateAction(req, res, next) {
    const missingActionDetails =  !req.body.notes || !req.body.description || !req.body.project_id

    if (missingActionDetails)
        return res.status(404).json({ error: "You must provide notes, description, and project id"})
    next()
}

function validateActionId(req, res, next) {
    const actionId = req.params.actionId

    if (isNaN(actionId))
        return res.status(404).json({ error: "Invalid syntax"})
    next()
}
//check
//Unclear why I have to update both the notes and the description -- why can't I just update 1 of them?
function validateActionUpdate(req, res, next) {
    if (!req.body.notes && !req.body.description)
        return res.status(400).json({ error: "You must provide notes and a description"})
    next()
}
