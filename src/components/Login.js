import React, {useState} from 'react'
import '../css/login.css';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router';





function Login() {
 const navigate=useNavigate();
  const[email,setEmail]=useState("")
  const[pass,setPass]=useState("")
  const handleChange = (e) =>{
    if(e.target.className==="email"){
      setEmail(e.target.value)
    }
    else{
      setPass(e.target.value)
    }
  }
 
  const HandleSubmit = async(e) =>{
    e.preventDefault();
    try{
     await signInWithEmailAndPassword(auth,email,pass)
     toast.success("User Logged in Successfully",{
      position: "top-center",
      autoClose: 3000,
      
     })
     setTimeout(() => {
      navigate('/main');
    }, 3000);
    }catch(error){
      toast.error(`Login Failed: ${error.message}`, {
              position: "top-center",
              autoClose: 4000,
            });
      navigate('/signup')
    }
  }
  
  return (
    <div className='main-container'>
      <div className="left-container">
        <div className="logo">
          <span className="logoimg">
            <img src="./OBJECTS.png" alt="/" height="100%" width="100%" />
          </span>
          <div className="logo-name">PrepWise</div>
        </div>
        <div className="heading">AI-powered mock interviews
          to get you hired!</div>
        <div className="img">
          <img src="./signupimg.png" alt="" />
        </div>
        <ul className='ulbullet'>
          <li>Practice with real AI interviewers</li>
          <li>improve your interview skills</li>
        </ul>
      </div>
      <div className="right-container">
        <div className="signin-container">
          <div className="signin">Sign in</div>
          <div className="signin-heading">
            If you don’t have an account register
            <br />
            You can <span className="span-heading">Register here !</span>
          </div>
          <form action="" onSubmit={HandleSubmit} >
            <label for="email">Email</label>
            <div className='input-container'>
              <span className="emailimg"><img src="./message 1.png" alt="" /></span>
              <input type="text" value={email} className="email"  onChange={handleChange}/>
            </div>
            <label for="password">Password</label>
            <div className='input-container'>
              <span className="passwordimg"><img src="./padlock 1.png" alt="" /></span>
              <input type="text" value={pass} className="password" onChange={handleChange} />
            </div>
            <div className="conditions">
              <div className="remember">
                <input type='checkbox' className='check' />
                <span>Remember me</span>
              </div>
              <div className="forget">
                Forgot Password ?
              </div>
            </div>
            <button className="submit">
              Login
            </button>
          </form>
          <div className="messa">or continue with</div>
          <div className="social-icons">
            <a href="#" className="icon-link">
              <img src="./Facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="icon-link">
              <img src="./google.png" alt="Google" />
            </a>
            <a href="#" className="icon-link">
              <img src="./apple.png" alt="Apple" />
            </a>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Login
