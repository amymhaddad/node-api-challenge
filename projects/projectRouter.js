const express = require("express")

router = express.Router()

const Project = require("../data/helpers/projectModel")
const { response } = require("express")

const {validateProjectId} = require("../middlewares/Middleware")
const {validateProjectContent} = require("../middlewares/Middleware")


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

//The result of this req includes "actions" for each project
//Not sure why bc "actions" is not a column in the table. BUT it seems to be getting applied from the mappers function
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
        console.log("err", err)
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

router.delete("/:postId", (req, res) => {
    const postId = req.params.postId

    if (isNaN(postId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }

    Project.remove(postId)
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

module.exports = router;
