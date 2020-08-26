const express = require("express")

router = express.Router()

const Action = require("../data/helpers/actionModel")

//Get an array of actions
router.get("/", (req, res) => {
    Action.get()
    .then(action => {
        console.log(action)
        return res.status(200).json(action)
    })
    .catch(error => {
        return res.status(500).json({ message: "Server error" })
    })
})



module.exports = router;