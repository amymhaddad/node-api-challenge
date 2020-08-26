const express = require("express")

router = express.Router()

const Project = require("../data/helpers/projectModel")

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
router.get("/:projectId", (req, res) => {
    const projectId = req.params.projectId

    if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }
    Project.get(projectId)
    .then(project => {
        return res.status(200).json(project)
    })
    .catch(error => {
        console.log("err", error)
        return res.status(500).json({ error: "Server Error" })
    })
})

//check that I have all the correct checks here -- need to explicitly call Project.get(projectId)?
router.put("/:projectId", (req, res) => {
    const projectId = req.params.projectId
    const name = req.body.name
    const description = req.body.description
    const changes = {name, description}

    if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid syntax"})
    }

    if (!name || !description) {
        return res.status(400).json({ message: "The name and description are required fields."})
    }

    Project.update(projectId, changes)
    .then(updatedProject => {
        if (!updatedProject) {
            return res.status(404).json({ error: "Project id is not found"})
        }
        //Should I pull out the name and description to send back?
        const updatedName = updatedProject.name
        const udpatedDescription = updatedProject.description
        const allUpdates = {updatedName, udpatedDescription}
        return res.status(201).json(allUpdates) 
    })
    .catch(err => {
        console.log("err", err)
        return res.status(500).json({ error: "Server Error" })
    })
})

router.post("/", (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const newProject = {name, description}

    if (!name && !description) {
        console.log("name", name)
        return res.status(400).json({ message: "The name and description are required fields."})
    }

    Project.insert(newProject)
    .then(project => {
        console.log("project", project)
        res.status(201).json(project)
    })
    .catch(err => {
        console.log("err", err)
    })
})



module.exports = router;
