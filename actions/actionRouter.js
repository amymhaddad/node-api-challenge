const express = require("express")

router = express.Router()

const Action = require("../data/helpers/actionModel")
const {validateActionId} = require("../middlewares/Middleware")


//Get an array of actions
router.get("/", (req, res) => {
    console.log("HERE in actions")
    Action.get()
    .then(action => {
        return res.status(200).json(action)
    })
    .catch(error => {
        return res.status(500).json({ message: "Server error" })
    })
})

//Get specific action
router.get("/:actionId", validateActionId, (req, res) => {

    Action.get(req.params.actionId)
    .then(action => {
        if (!action) {
            return res.status(404).json({ error: "Action id is not found."})
        }
        return res.status(200).json(action)
    })
    .catch(error => {
        return res.status(500).json({ message: "Server error" })
    })
})

// router.put("/:actionId", (req, res) => {
//     const actionId = req.params.actionId

//     if (isNaN(actionId)) {
//         return res.status(404).json({ error: "Invalid syntax"})
//     }




module.exports = router;