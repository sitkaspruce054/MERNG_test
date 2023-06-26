import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import { gql, useMutation } from '@apollo/client'
import { isCompositeType } from 'graphql';
import { Navigate, useNavigate } from 'react-router-dom';


export const useForm = (callback,initialState = {}) => {
    const [values,setValues] = useState(initialState);

    const onChange = (event) =>{
        setValues({...values, [event.target.name]: event.target.value})
      };

    const onSubmit = event => {
        event.preventDefault();

        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}