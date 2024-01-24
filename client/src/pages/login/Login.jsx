import React,{useRef,useContext} from 'react'
import {CircularProgress} from '@mui/material'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext';
import '../login/Login.css'


function Login() {

    const email = useRef();
    const password = useRef();
    const {isFetching,dispatch} = useContext(AuthContext)

    
   

    const onhandleClick = (e) =>{
        e.preventDefault();
        loginCall(
            {email:email.current.value,password:password.current.value},
            dispatch,
        )
    }
    




  return (
   <div className="containerA flex">
    <div className='login flex'>
        <div className="loginWrapper flex">
            <div className="loginLeft flex">
                <h3 className='loginLogo'>ChatNext</h3>
                <span className='loginDesc'>
                    Connect around.
                </span>
            </div>
            <div className="loginRight flex">
                <form action="" className="loginBox" onSubmit={onhandleClick}>

                    <label htmlFor="email">Email</label>
                    <input type="email" required className='loginInput' ref={email} />
                    <label htmlFor="password">Password</label>
                    <input type='password' required minLength={8} className='loginInput' ref={password}/>
                    <button className='loginButton' type="submit" disabled={isFetching}>
                    {isFetching ? <CircularProgress color='primary' size={20} /> : 'Log In'}
                    </button>

                </form>
            </div>
            <div className="loginForget flex">
            <span className='loginForget'> forget password?</span>
            {isFetching ? <CircularProgress color='primary' size={20} /> :<a href="/register">Create a new account</a>}
            </div> 

        </div>
    </div>
    </div>
)
}
                 
export default Login
                   


           
                    