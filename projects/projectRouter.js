const express = require("express")

router = express.Router()

const Project = require("../data/helpers/projectModel")
const Action = require("../data/helpers/actionModel")
const {validateProjectId, validateProjectUpdate, validateProjectContent, validateAction} = require("../middlewares/Middleware")


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
        if (!project)
            return res.status(404).json({ error: "Project id is not found."})
        return res.status(200).json(project)
    })
    .catch(error => {
        return res.status(500).json({ error: "Server Error" })
    })
})


router.put("/:projectId", [validateProjectId, validateProjectUpdate], (req, res) => {
    Project.update(req.params.projectId, req.body)
    .then(updatedProject => {
        if (!updatedProject) 
            return res.status(404).json({ error: "Project id is not found"})
        return res.status(201).json(updatedProject) 
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
            if (!count)
                return res.status(404).json({ error: "Project id is not found"})
            return res.sendStatus(204);
        })
        .catch(err => {
            return res.status(500).json({ error: "Server error "})
    }) 
})

router.get("/:projectId/actions", validateProjectId, (req, res) => {
    Project.get(req.params.projectId)
    .then(project => {
        if (!project) 
            return res.status(404).json({ error: "Project id is not found"})
        Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
    })
    .catch(err => {
        return res.status(500).json({ error: "Server error "})
    }) 

})

//project_id MUST be part of the body, which seems strange?
//I must include the project_id in order to add a new action for a project. But that seems strange bc the project_id comes through the url
router.post("/:projectId/actions", [validateProjectId, validateAction], (req, res) => {
    Project.get(req.params.projectId)
    .then(project => {
        if (!project) 
            return res.status(404).json({ error: "Project id is not found"})
        Action.insert(req.body, req.params.projectId)
        .then(action => {
            return res.status(201).json(action)
        })
    })
    .catch(error => {
            return res.status(500).json({ message: "Server error" })
        })
})

module.exports = router;
