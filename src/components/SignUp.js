import React, { useState } from 'react'

const SignUp = () => {

    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const Handlechange=(e)=>{
        if(e.target.className==="name"){
            setName(e.target.value)
        }
        else if(e.target.className==="email"){
            setEmail(e.target.value)
        }
        else if(e.target.className==="password"){
            setPassword(e.target.value)
        }
    }
  return (
    <div className="signup">
      <div className="image">
      <span className="signupcontent">Land Your Dream Job with 
        AI-Powered Practice!</span>
        <div className="signupimg">
        <img src="./signupimg1.png" alt="/" height="100%" width="100%"/>
        </div>
        <ul style={{color:"pink"}}>
            <li>Get real-time feedback</li>
            <li>Practice anytime, anywhere</li>
        </ul>
      </div>
      <div className="signupform">
        <div className="signupnav">
            <span className="spanimg">
                <img src="./OBJECTS.png" alt="/" height="100%" width="100%"/>
            </span>
            <div className="spancontent">
            PrepWise
            </div>
        </div>
        <form>
            <label for ="name">Full name</label>
            <input type="text" className="name" onChange={Handlechange} />
            <label for ="email">Email</label>
            <input type="text" className="email" onchange={Handlechange} />
            <label for ="password">Password</label>
            <input type="text" className="password" onchange={Handlechange} />
            <label for ="picture">Profile Picture</label>
            <input type="file" className="picture" onchange={Handlechange} />
            <label for ="resume">Resume</label>
            <input type="file" className="resume" onchange={Handlechange} />
            <button className="signupsubmit">Create an account</button>
            
        </form>
        
      </div>
    </div>
  )
}

export default SignUp
