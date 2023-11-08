import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserById, getAllUsers } from "../../api/UserApis";


export default function UserList() {
    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    function refreshUsers() {
        getAllUsers()
            .then(response => {
                setUsers(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        refreshUsers();
    }, [])

    const deleteUser = async (id) => {
        deleteUserById(id)
            .then(() => {
                setMessage(`Successfully deleted todo ${id}`)
                refreshUsers()
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    return (
        <div className="container text-center w-75">
            <h1>Users </h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Roles</td>
                        <td>Email Verified</td>
                        <td></td><td></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            users => (
                                <tr key={users.id}>
                                    <td>{users.username}</td>
                                    <td>{users.email}</td>
                                    {users.roles.map(
                                        roles => (
                                            <td key={roles.id}>{roles.name}</td>
                                        )
                                    )
                                    }
                                    <td>{users.emailVerified.toString()}</td>
                                    <td><Link className="btn btn-success" to={`${users.id}`}>Update</Link></td>
                                    <td><button className="btn btn-warning"
                                        onClick={() => deleteUser(users.id)}
                                    >Delete</button></td>
                                </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
    );

}
