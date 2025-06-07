const express = require("express");
const app = express();
app.listen(3000);
app.use(express.json());
const {createTodo,updateTodo} = require("./types");
const {todo} = require("./db");

const cors = require("cors");
app.use(cors());

// var globalId = 0;

app.get("/todos",async function(req,res){
    const todos = await todo.find(); // no filter param passed, will return every entry in this table
    res.json({
        todos
    });
})

app.post("/todo", async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg:"You sent the wrong inputs"
        })
    }

    await todo.create({
        title: createPayload.title,
        description : createPayload.description,
        completed : false
    });

    res.status(200).json({
        msg: "Todo created!"
    });
})

app.put("/completed", async function(req,res){
    const updatePayload = req.body;
    // console.log("The request body recd at backend is :", req.body);
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success){
        return res.status(411).json({
            msg: "You sent the wrong input!"
        });
    }
    // update from mongo db
    const id = updatePayload.id;

    // const todo_put = await todo.find({id});

    await todo.updateOne({
        _id : id
    },{
        $set : {completed : true}
    });

    res.json({
        msg: "Todo updated"
    });
})

// ALTERNATIVE : mongo db itself assigns a `_id`, so we dont need to keep track of globalId ourselves, we can just query for `_id : id` while updating the todo
// TBH, it is better to use the _id object only, since here globalId is a local var, and gets reset whenev I restart the server.