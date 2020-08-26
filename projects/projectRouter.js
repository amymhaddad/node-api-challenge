const express = require("express")

router = express.Router()

const Project = require("../data/helpers/projectModel")
const Action = require("../data/helpers/actionModel")
const {validateProjectId, validateProjectContent} = require("../middlewares/Middleware")


//My console statemetns are no longer getting printed when I run my endpoints 

//Model is the class that gives you access the DB 
router.get("/", (req, res) => {
    Project.get()
    .then(projects => {
        return res.status(200).json(projects)
    })
    .catch(error => {
        return res.status(500).json({ error: "Server Error" })
    })
})

router.get("/:projectId", validateProjectId, (req, res) => {
    Project.get(req.params.projectId)
    .then(project => {
        if (!project) {
            return res.status(404).json({ error: "Project id is not found."})
        }
        return res.status(200).json(project)
    })
    .catch(error => {
        return res.status(500).json({ error: "Server Error" })
    })
})

router.put("/:projectId", [validateProjectId, validateProjectContent], (req, res) => {
    Project.update(req.params.projectId, req.body)
    .then(updatedProject => {
        if (!updatedProject) {
            return res.status(404).json({ error: "Project id is not found"})
        }
        return res.status(201).json(req.body) 
    })
    .catch(err => {
        return res.status(500).json({ error: "Server Error" })
    })
})

router.post("/", validateProjectContent, (req, res) => {
    Project.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        return res.status(500).json({ error: "Server error "})
    })
})

router.delete("/:projectId", validateProjectId, (req, res) => {
    Project.remove(req.params.projectId)
        .then(count => {
            if (!count) {
                return res.status(404).json({ error: "Project id is not found"})
            }
            return res.sendStatus(204);
        })
        .catch(err => {
            return res.status(500).json({ error: "Server error "})
    }) 
})





//Add a new action -- HERE
router.post("/:actionId/projects", (req, res) => {
    const actionId = req.params.actionId
    const name = req.body.name
    const description = req.body.description

    if (isNaN(actionId)) {
        return res.status(404).json({ error: "Invalid syntax"})
    }

    if (!name || !description) {
        return res.status(404).json({ error: "Invalid syntax"})
    }

    Action.get(actionId)
    .then(project => {
        console.log("project", project)
        if (!project) {
            return res.status(404).json({ error: "Action id is not valid"})
        }
    Project.insert(req.body)  
    .then(newAction => {
        console.log("NEW", newAction)
        return res.status(201).json(req.body)
        })
    })
    .catch(error => {
        console.log("ERR", error)
            return res.status(500).json({ message: "Server error" })
        })


})


module.exports = router;
