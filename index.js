
const express = require("express")
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000 

const projectRouter = require("./projects/projectRouter")
const actionRouter = require("./actions/actionRouter")

app.use("/api/projects", projectRouter)
app.use("/api/actions", actionRouter)

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log("Port:", port)
})
