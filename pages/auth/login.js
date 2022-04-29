import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Login } from '@/components/auth/Login';
import { loginRequest, loginCancelled, logoutRequest } from '@/modules/auth/login';

const LoginPage = () => {
  const [user, setUser] = useState({
    userid:'', password:''
  })
  const dispatch = useDispatch()
  const onChange = e => {
    e.preventDefault()
    const{name, value} = e.target;
    setUser({...user, [name] : value})
  }
  const onSubmit = e => {
    e.preventDefault()
    alert('로그인')
    dispatch(loginRequest(user))
  }
  return (
    <Login onChange={onChange} onSubmit={onSubmit}/>
  );
};


const mapStateToProps = state => ({isLogined: state.login})
const loginActions = {loginRequest, loginCancelled, logoutRequest}
export default connect(mapStateToProps, loginActions)(LoginPage)