const db = require('../dbConfig.js');
const mappers = require('./mappers');

module.exports = {
  get,
  insert,
  update,
  remove,
};

function get(id) {
  let query = db('actions');
  //IF there's an id: return a query that matches the id
  if (id) {

    return query
      .where('id', id)
      .first()
      .then((action) => {
        //Return the action asscoiated with the id 
        if (action) {
          //If there's an action, the mapper function is used to return the action and it's completed status
          return mappers.actionToBody(action);
        } else {
          //otherwise reutrn null 
          return null;
        }
      });
  } else {
    return query.then((actions) => {
      return actions.map((action) => mappers.actionToBody(action));
    });
  }
}

function insert(action) {
  return db('actions')
    .insert(action, 'id')
    .then(([id]) => get(id));
}

function update(id, changes) {
  return db('actions')
    .where('id', id)
    .update(changes)
    .then((count) => (count > 0 ? get(id) : null));
}

function remove(id) {
  return db('actions').where('id', id).del();
}
