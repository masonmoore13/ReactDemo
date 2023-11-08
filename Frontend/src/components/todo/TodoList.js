import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTodoApi, getAllTodosForUserId } from "../../api/TodoApis";
import AuthService from "../../services/auth.service";
import "./Todo.css";

export default function TodoList() {

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('')
    const user = AuthService.getCurrentUser();
    const navigate = useNavigate()

    function refreshTodos() {
        getAllTodosForUserId(user.id)
            .then(response => {
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function createTodo() {
        navigate("/todo/-1")
    }

    const deleteTodo = async (id) => {
        deleteTodoApi(user.id, id)
            .then(() => {
                setMessage(`Successfully deleted todo ${id}`)
                refreshTodos()
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    useEffect(()=>{
        refreshTodos();
    }, [])

    return (
        <div className="container w-75 flex-wrap justify-content-center text-center">
            <h1>Todo List <a className="btn btn-success mb-2" onClick={createTodo}>Create Todo</a></h1>
            {message && <div className="deleteAlert alert alert-warning mx-auto">{message}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <td>Description</td>
                        <td>Completed</td>
                        <td>Target Date</td>
                        <td></td><td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(
                            todos => (
                                <tr key={todos.id}>
                                    <td>{todos.description}</td>
                                    <td>{todos.done.toString()}</td>
                                    <td>{todos.targetDate}</td>
                                    <td><Link className="btn btn-success" to={`${todos.id}`}>Update</Link></td>
                                    <td><button className="btn btn-warning"
                                        onClick={() => deleteTodo(todos.id)}
                                    >Delete</button></td>
                                </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}