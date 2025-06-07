const z = require("zod");

const createTodo = z.object({
    title : z.string(),
    description : z.string()
});

// we have to wrap it in a z.object since we primarily deal with JSON objects
const updateTodo = z.object({
    id : z.string(), // e since we are using the internal `_id` param of mongo db
});

module.exports = {
    createTodo : createTodo,
    updateTodo : updateTodo
};