import React, { useEffect, useState } from 'react'
import '../css/main.css';
import Card from './Card';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';



const Main = () => {

  const [username, setUsername] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); 
      }
    });

    return () => unsubscribe();
  }, []);
  const job = [
    {
      id:1,
      img:"./A.png",
      type:"Technical",
      name:"Frontend Dev Interview",
      date:"Feb 28, 2025",
      star:"12/100",
    },
    {
      id:2,
      img:"./B.png",
      type:"Non-Technical",
      name:"Behavioural Interview",
      date:"Feb 23, 2025",
      star:"54/100"
    },
    {
      id:3,
      img:"./B.png",
      type:"Non-Technical",
      name:"Backend Dev Interview",
      date:"Feb 21, 2025",
      star:"94/100"
    }
]
  return (
    <div className="main">
      <div className="mainnav">
        <div className="mainnavid">
          <span className="mainnavimg">
            <img src="./image (2).png" alt="/" height="100%" width="100%"/>
          </span>
          <span className="mainnavname">
          Good morning ,<span className="colorchange">{username}!!</span> 
          </span>
        </div>
        <div className="mainnavappname">
        <span className="spanimg">
            <img src="./OBJECTS.png" alt="logo" height="100%" width="100%" />
          </span>
          <div className="mainnavcontent">PrepWise</div>
        </div>
      </div>
      <div className="maincontent">
         <div className="maincontentcon">
         <p>Get Interview-Ready with AI-Powered Practice & Feedback</p>
         <span className="smalltxt">Practice simulated interviews and get instant feedback</span>
         </div>
         <div className="maincontentimg">
            <img src ="./robot.png" height="125%" width="120%" alt="/" />
         </div>
      </div>
      <div className="mainpastinterview">
         <span className="cardhead">Your Past Interviews</span>
         <div className="pastinter">
         {job.map((item)=>{
        return(
          <Card imgurl={item.img}
                type={item.type}
                name={item.name}
                date={item.date}
                star={item.star} />
              
           )
      })}
      </div>
      </div>
     
      <div className="mainpickinterview">
      <span className="cardhead">Pick Your Interviews</span>
      <div className="pastinter">
         {job.map((item)=>{
        return(
          <Card imgurl={item.img}
                type={item.type}
                name={item.name}
                date={item.date}
                star={item.star} />
              
           )
      })}
      </div>
      <div className="pastinter">
         {job.map((item)=>{
        return(
          <Card imgurl={item.img}
                type={item.type}
                name={item.name}
                date={item.date}
                star={item.star} />
              
           )
      })}
      </div>
      <div className="pastinter">
         {job.map((item)=>{
        return(
          <Card imgurl={item.img}
                type={item.type}
                name={item.name}
                date={item.date}
                star={item.star} />
              
           )
      })}
      </div>

      </div>
    </div>
  )
}

export default Main
