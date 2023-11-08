import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTodoApi, retrieveTodoApi, updateTodoApi } from '../../api/TodoApis'
import AuthService from '../../services/auth.service'

export default function UpdateTodo() {

    const { id } = useParams()

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const [done, setDone] = useState('')

    const user = AuthService.getCurrentUser();

    const navigate = useNavigate()

    //Call the retrieveTodo function with the paramater from URL
    useEffect(
        () => retrieveTodos(),
        [id]
    )

    // //Retrieve todo info to fill out forms unless id=-1 for todo creation
    function retrieveTodos() {
        if (id != -1) {
            retrieveTodoApi(user.id, id)
                .then(response => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                    setDone(response.data.done)
                })
                .catch(error => console.log(error))
        }
    }

    function onSubmit(values) {
        console.log(values)

        const todo = {
            id: id,
            userId: user.id,
            description: values.description,
            targetDate: values.targetDate,
            done: values.done
        }

        console.log(todo)

        if (id == -1) {
            createTodoApi(user.id, todo)
                .then(response => {
                    navigate('/todo')
                })
                .catch(error => console.log(error))

        } else {
            updateTodoApi(user.id, id, todo)
                .then(response => {
                    navigate('/todo')
                })
                .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {}

        if (values.description.length < 5) {
            errors.description = 'Enter at least 5 characters'
        }

        if (values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a target date'
        }

        console.log(values)
        return errors
    }

    return (
        <div className="container text-center">
            <h1>Enter Todo Details </h1>

            <Formik initialValues={{ description, targetDate, done }}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                            />

                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            />

                            <div className="form-group d-flex justify-content-center">
                                <div className="mt-2" style={{ fontSize: 22 }}>
                                    Description
                                </div>
                                <div className="col-md-4" >
                                    <Field type="text" className="form-control" name="description" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="mt-2" style={{ fontSize: 22 }}>
                                    Target Date
                                </div>
                                <div className="col-md-2" >
                                    <Field type="date" className="form-control" name="targetDate" />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="mt-2" style={{ fontSize: 22 }}>
                                    Completed?
                                </div>
                                <div className="" >
                                    <Field type="checkbox" className="form-check" name="done" />
                                </div>
                            </div>

                            <div>
                                <button className="btn btn-success m-3 " type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}