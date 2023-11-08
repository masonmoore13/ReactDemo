import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createUser, getUserById, updateUser } from '../../api/UserApis'

export default function UpdateUser() {

   const { id } = useParams()

   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [emailVerified, setEmailVerified] = useState('')
   const [password, setPassword] = useState('')
   const [roleName, setRoleName] = useState('')
   const [roleId, setRoleId] = useState('')

   const navigate = useNavigate()

   useEffect(
      () => getUser(),
      [id]
   )

   function getUser() {
      if (id != -1) {
         getUserById(id)
            .then(response => {
               setUsername(response.data.username)
               setEmail(response.data.email)
               setEmailVerified(response.data.emailVerified)
               setPassword(response.data.password)
               setRoleName(response.data.roles[0].name)
               setRoleId(response.data.roles[0].id)
            })
            .catch(error => console.log(error))
      }
   }

   function onSubmit(values) {
      console.log(values)
      
      let roleId = values.roleId;

      if (values.roleName == "ROLE_ADMIN") { 
         roleId = 1
      }
      if (values.roleName == "ROLE_MODERATOR") { 
         roleId = 2
      }
      if (values.roleName == "ROLE_USER") { 
         roleId = 3
      }
   
      const user = {
         id: id,
         username: values.username,
         email: values.email,
         emailVerified: values.emailVerified,
         password: values.password,
         roles: [{ id: roleId, name: values.roleName }]

      }

      //creates user if url param is -1, sent from "createUser"
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

      return errors
   }

   return (
      <div className="container text-center">
         <h1>Enter Todo Details </h1>

         <Formik initialValues={{ username, email, emailVerified, password, roleName, roleId }}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
         >
            {
               (values) => (
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
                        <div className="mt-2 ml-5" style={{ fontSize: 22 }}>
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

                     <div className="d-flex justify-content-center" >
                        <div className="m-1" style={{ fontSize: 22 }}>
                           Role
                        </div>
                        <Field name="roleName" component="select" className="ml-2 ">
                           <option name="roleName" value="ROLE_ADMIN">ROLE_ADMIN</option>
                           <option name="roleName" value="ROLE_MODERATOR">ROLE_MODERATOR</option>
                           <option name="roleName" value="ROLE_USER">ROLE_USER</option>
                        </Field>
                     </div>

                     <div className="d-flex justify-content-center">
                        <div className="mt-2" style={{ fontSize: 22 }}>
                           Email Verified
                        </div>
                        <div className="mt-2" >
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