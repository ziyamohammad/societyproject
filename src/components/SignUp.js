import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase'; 
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {TextField,IconButton,InputAdornment} from '@mui/material';

const SignUp = () => {
  const [show ,setShow] = useState(false);
   const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const validname = /^[a-zA-Z]+( [a-zA-Z]+){1,}$/;
  const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [checkname, setCheckname] = useState(true);
  const [checkemail, setcheckemail] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name"){
      setName(value);
      if(!validname.test(value) && value !== ""){
         setCheckname(false);
         return;
      }
      setCheckname(true);
    } 
    if (name === "email"){
      setEmail(value);
      if(!validemail.test(value) && value !== ""){
         setcheckemail(false);
         return;
      }
      setcheckemail(true)
    } 
    if (name === "password") {
      setPassword(value);
    } 
      
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!checkemail || !checkname){
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(auth.currentUser, {
        displayName: name, 
      });
  

      await setDoc(doc(db, "Users", user.uid), {
        fullname: name,
        email: user.email,
        password:password,
      });

      // alert("Account created successfully!");
      toast.success("User Registered Successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      toast.error(`Registration Failed: ${error.message}`, {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="signup">
      <div className="image">
        <span className="signupcontent">Land Your Dream Job with AI-Powered Practice!</span>
        <div className="signupimg">
          <img src="./signupimg1.png" alt="illustration" height="100%" width="100%" />
        </div>
        <ul style={{ color: "pink" }}>
          <li>Get real-time feedback</li>
          <li>Practice anytime, anywhere</li>
        </ul>
      </div>

      <div className="signupform">
        <div className="signupnav">
          <span className="spanimg">
            <img src="./OBJECTS.png" alt="logo" height="100%" width="100%" />
          </span>
          <div className="spancontent">PrepWise</div>
        </div>

        <form onSubmit={handleRegister}>
          <label htmlFor="name">Full name</label>
          <input type="text" className={checkname ? "name" : "wrong-name"} name='name' value={name} onChange={handleChange} required  />
         {!checkname && <div style={{color:"red"}}>Enter Full Name</div>}
          <label htmlFor="email">Email</label>
          <input type="email" className={checkemail ? "email" : "wrong-email"} name='email' value={email} onChange={handleChange} required />
          {!checkemail && <div style={{color:"red"}}>Enter correct email</div>}
          <label htmlFor="password">Password</label>
          <TextField
      name='password'
      variant="outlined"
      type={show? "text" : "password"}
      fullWidth
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={()=>setShow(!show)}edge="end">
              {show ? <VisibilityIcon/> : <VisibilityOffIcon/>}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
        
          <label htmlFor="picture">Profile Picture</label>
          <input type="file" className="picture" disabled />

          <label htmlFor="resume">Resume</label>
          <input type="file" className="resume" disabled />

          <button className="signupsubmit" type="submit">Create an account</button>
        </form>
      </div>
     
    </div>
  );
};

export default SignUp;
