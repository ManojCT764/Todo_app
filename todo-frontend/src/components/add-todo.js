import React , {useState} from "react"

const AddTodo = () => {
    const [todo, setTodo] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted : ", todo);
        try {
            const response = await fetch('http://localhost:3000/add-todo' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: todo})
            })
            const data = await response.json()
            console.log("Response from server: ", data
            )
        } 
        catch (error) {
            console.error("Error adding todo: ", error)
        }
    }
    return (
        <div>
            <h3>Add New Todo</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                value={todo} 
                placeholder="Enter todo"
                onChange={(e) => setTodo(e.target.value)} 
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}

export default AddTodo