
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import { gql, useMutation } from '@apollo/client'
import { isCompositeType } from 'graphql';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from '../util/hooks'
import { AuthContext } from '../context/auth';
function Login(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({})
  const { onChange, onSubmit, values } = useForm( loginUserCallback, {
    username: '',
    password: ''
  })
  
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_,{ data: {login: userData}}){
        
        context.login(userData)
        navigate("/")
    },
    onError(err){
        
        if(err.graphQLErrors[0] !== undefined){
            setErrors(err.graphQLErrors[0].extensions.errors);
        }
        
        
        
    },
    variables: values
  })

  function loginUserCallback(){
     
    loginUser()
  }
  
  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading': ''}>
        <h1>Login</h1>
        <Form.Input
            label="Username"
            placeholder="Username..."
            name="username"
            type="text"
            value={values.username}
            
            onChange={onChange}
            />
       
        <Form.Input
            label="Password"
            placeholder="Password..."
            name="password"
            type="password"
            value={values.password}
            
            onChange={onChange}
            />
        
        <Button type="submit" color='teal' >
            Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
            <ul className="list">
                {Object.values(errors).map(value => (
                    
                        <li key={value}>{value}</li>
                    
                ))}
            </ul>
      </div>
      )}
    </div>
  )
}

const LOGIN_USER = gql`
    mutation register(
        $username: String!
         
        $password: String!
         
    ) {
        login(
            
                username: $username
                 
                password: $password
                 
            
        ){
            id email username createdat token 
        }
    }

`



export default Login
