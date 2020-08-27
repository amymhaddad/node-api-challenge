
module.exports = {
    logger,
    validateProjectId,
    validateProjectContent, 
    validateAction,
    validateActionId,
    validateActionContent
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
    if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }
    next()
}

//Unclear why I have to update both the name and the description -- why can't I just update 1 of them?
function validateProjectContent(req, res, next) {
    if (!req.body.name || !req.body.description) {
        return res.status(400).json({ error: "You need to provide a name or description."})
    }
    next()
}

function validateAction(req, res, next) {
    const missingActionDetails =  !req.body.notes && !req.body.description

    if (missingActionDetails) {
        return res.status(404).json({ error: "You must provide notes and a description"})
    }
    next()
}

function validateActionId(req, res, next) {
    const actionId = req.params.actionId

    if (isNaN(actionId))
        return res.status(404).json({ error: "Invalid syntax"})
    next()
}

//Unclear why I have to update both the notes and the description -- why can't I just update 1 of them?
function validateActionContent(req, res, next) {
    if (!req.body.notes || !req.body.description)
        return res.status(400).json({ error: "You must provide notes or a description"})
    next()
}
