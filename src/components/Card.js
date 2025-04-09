import React from 'react'
import '../css/main.css';
import { useNavigate } from 'react-router';

const Card = (job) => {
    const navigate=useNavigate();
    let{imgurl,type,name,date,star}=job;

    const handleClick=()=>{
       navigate('/login')
    }
  return (
    
    <div className="card">
       <div className="cardmain">
        <span className ="company"><img src={imgurl} alt="/" height="100%" width="100%" /></span>
        <span className="companytype">{type}</span>

       </div>
       <span className="interviewname">
         {name}
       </span>
       <div className="timings">
        <div className="dateall">
        <img src="./calendar.png"  alt="/"  />
        <span className="date">{date}</span>
        </div>
        <div className="starall">
        <img src="./star.png"  alt="/"  />
        <span className="star">{star}</span>
        </div>
       </div>
       <div className="theory">
       This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative, making it more
       </div>
       <div className="lastpart">
        <span className="lastlogo"> <img src="./technologies.png"  alt="/"  /></span>
        <button className="interviewbutton" onClick={handleClick}>View Interview</button>
       </div>
    </div>
  )
}

export default Card
