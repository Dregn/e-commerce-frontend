import React from 'react'
import FormContainer from '../Components/FormContainer'
import {useDispatch,useSelector} from 'react-redux'
import { login } from '../actions/userAction'
import Loader from '../Components/Loader'

function UserLoginScreen() {
  return (
    <FormContainer>
      <h1>Sign In</h1>

    </FormContainer>
  )
}

export default UserLoginScreen
