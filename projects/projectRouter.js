const express = require("express")

router = express.Router()

const Project = require("../data/helpers/projectModel")

//Model is the class that you access the DB 

router.get("/", (req, res) => {
    Project.get()
    .then(projects => {
        return res.status(200).json(projects)
        // console.log("project", projects)

    })
})



module.exports = router;
