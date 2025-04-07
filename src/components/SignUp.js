import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth, db } from './firebase'; 
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';



const SignUp = () => {
   const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { className, value } = e.target;
    if (className.includes("name")) setName(value);
    if (className.includes("email")) setEmail(value);
    if (className.includes("password")) setPassword(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

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
          <input type="text" className="name" value={name} onChange={handleChange} required />

          <label htmlFor="email">Email</label>
          <input type="email" className="email" value={email} onChange={handleChange} required />

          <label htmlFor="password">Password</label>
          <input type="password" className="password" value={password} onChange={handleChange} required />

        
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
