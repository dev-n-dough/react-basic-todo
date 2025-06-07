
// we can either take `props` as input, and then do `props.todos`, or destructure props as follows:
export function Todos({todos}){
    return <div>
        {todos.map(function(todo){
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                {/* <h3>{todo._id}</h3> */}
                <button onClick = {() => {
                    // console.log("The on-click callback has been triggered!");
                    fetch("http://localhost:3000/completed",{
                        method : "PUT",
                        body : JSON.stringify({
                            id : todo._id
                            // id : "6843ebf02a5b4b3e579df9dc"
                        }),
                        headers : {
                            "Content-Type" : "application/json"
                        }
                    })
                    .then(async function(res){
                        const json = await res.json();
                        console.log(json);
                    })
                }}>{todo.completed ? "Completed" : "Mark as Completed"}</button>
            </div>
        })}
    </div>
}