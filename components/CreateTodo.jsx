import {useState} from "react";

export function CreateTodo() {

   const [title,setTitle] = useState("");
   const [desc,setDesc] = useState("");

    return <div>
        <input type = "text" placeholder="Title" onChange = {function(e){
            setTitle(e.target.value)
        }}></input><br></br>
        <input type = "text" placeholder="Description" onChange = {function(e){
            setDesc(e.target.value)
        }}></input><br></br>

        <button onClick = {() => {
            fetch("http://localhost:3000/todo",{
                method : "POST",
                body : JSON.stringify({
                    title : title,
                    description : desc
                }),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then(async function(res){
                const json = await res.json();
                console.log(json.msg);
            })
        }}>Add a Todo</button>
    </div>
}