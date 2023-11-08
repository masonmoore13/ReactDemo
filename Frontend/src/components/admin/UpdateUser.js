import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createUser, getUserById, updateUser } from '../../api/UserApis'
import AuthService from '../../services/auth.service'

export default function UpdateUser() {

   const { id } = useParams()

   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [emailVerified, setEmailVerified] = useState('')
   const [password, setPassword] = useState('')
   const [roles, setRoles] = useState('')

   const user = AuthService.getCurrentUser();

   const navigate = useNavigate()

   //Call the retrieveTodo function with the paramater from URL
   useEffect(
      () => getUser(),
      [id]
   )

   // //Retrieve todo info to fill out forms unless id=-1 for todo creation
   function getUser() {
      if (id != -1) {
         getUserById(id)
            .then(response => {
               setUsername(response.data.username)
               setEmail(response.data.email)
               setEmailVerified(response.data.emailVerified)
               setPassword(response.data.password)
               setRoles(response.data.roles)
            })
            .catch(error => console.log(error))
      }
   }

   function onSubmit(values) {
      console.log(values)

      const user = {
         id: id,
         username: values.username,
         email: values.email,
         emailVerified: values.emailVerified,
         password: values.password,
         roles: values.roles
      }

      console.log(user)

      if (id == -1) {
         createUser(user)
            .then(response => {
               navigate('/userList')
            })
            .catch(error => console.log(error))

      } else {
         updateUser(id, user)
            .then(response => {
               navigate('/userList')
            })
            .catch(error => console.log(error))
      }
   }

   function validate(values) {
      let errors = {}

      // if (values.description.length < 5) {
      //    errors.description = 'Enter at least 5 characters'
      // }

      // if (values.targetDate === null || values.targetDate === '' || !moment(values.targetDate).isValid()) {
      //    errors.targetDate = 'Enter a target date'
      // }

      console.log(values)
      return errors
   }

   return (
      <div className="container text-center">
         <h1>Enter Todo Details </h1>

         <Formik initialValues={{ username, email, emailVerified, password, roles }}
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

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Username
                        </div>
                        <div className="col-md-4" >
                           <Field type="text" className="form-control" name="username" />
                        </div>
                     </div>

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Email
                        </div>
                        <div className="col-md-4" >
                           <Field type="text" className="form-control" name="email" />
                        </div>
                     </div>

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Password
                        </div>
                        <div className="col-md-4" >
                           <Field type="password" className="form-control" name="password" />
                        </div>
                     </div>

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Role
                        </div>
                        <div className="" >
                           <Field type="text" className="form-control" name="roles" />
                        </div>
                     </div>

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Email Verified
                        </div>
                        <div className="" >
                           <Field type="checkbox" className="form-check " name="emailVerified" />
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