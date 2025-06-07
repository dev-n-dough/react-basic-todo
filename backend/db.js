const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:%40%40Akshat1@cluster0.dkiipmz.mongodb.net/week_5_redo");

const todoSchema = mongoose.Schema({
    title : String,
    description : String,
    completed : Boolean
});

const todo = mongoose.model('Todos',todoSchema);

module.exports = {
    todo: todo
};