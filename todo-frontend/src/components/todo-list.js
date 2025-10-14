import React, {use, useEffect, useState} from "react";

import AddTodo from "./add-todo";
import TodoItem from "./todo-item";
import BACKEND_URL from "../Config/config";  

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(async () => {
    
    }, [])

    const fetchTodos = async () => {
        try {
            const response = await fetch('${BACKEND_URL}/api/todos');
            console.log("Fetch todos response: ", response);
        }
        catch (error) {
            console.error("Error fetching todos: ", error);
        }
    }
}