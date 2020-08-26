const db = require("../dbConfig.js");
const mappers = require("./mappers");

module.exports = {
  get,
  insert,
  update,
  remove,
  getProjectActions,
};

function get(id) {
  let query = db("projects as p");
  //If there's an id, get the first matching id
  if (id) {
    query.where("p.id", id).first();

    //Create a promise to query the projects based on id
    const promises = [query, getProjectActions(id)]; // [ projects, actions ]

    //Return the results of the promise, which contains a project and actions
    return Promise.all(promises).then(function(results) {
      //Destructure the contents of the promise
      let [project, actions] = results;

      //IF there's a project (from the result of the project)
      if (project) {
        //Get the actions (from the promise) associated with the project
        project.actions = actions;

        //Return the project body 
        return mappers.projectToBody(project);
      } else {
        return null;
      }
    });
  
  } else {
    //IF there's NO id, then return the results of the query.
    //This returns the projects 
    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }
}

function insert(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db("projects")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}

function getProjectActions(projectId) {
  return db("actions")
    .where("project_id", projectId)
    .then(actions => actions.map(action => mappers.actionToBody(action)));
}
