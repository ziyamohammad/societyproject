import React from 'react'
import '../css/interface.css'
function Interface() {
  return (
    <div className='main-containers'>
        <div className="top-container">
        <div className="logo">
          <span className="logoimg">
            <img src="./OBJECTS.png" alt="/" height="100%" width="100%" />
          </span>
          <div className="logo-name">PrepWise</div>
        </div>
<div className="top-logo">
    <img src="./apimg.png" alt="" />
</div>
        </div>
        <div className="second-container">
            <div className="second-left">
                <span style={{ marginRight: '0.5em' }}><img src="./image 18.png" alt="" /></span>
                 Frontend Developer Interview <span style={{ marginLeft: '0.5em' }}><img src="./tech.png" alt="" /><img src="./Frame.png" alt="" /></span>
            </div>
            <div className="second-right">Technical Interview</div>
        </div>
        <div className="boxes">
            <div className="box">
                <img src="./avatar-removebg-preview (1).png" alt="" />
                <span>AI Interviewer</span>
            </div>
            <div className="box">
            <img src="./image (1).png" alt="" />
            <span>Adrian (You)</span>
            </div>
        </div>
        <div className="question">
        What job experience level are you targeting?
        </div>
        <div className="buttons">
          <button className="repeat"><span><img src="./repeate-music.png" alt="" /></span> Repeat</button>
          <button className="leave" ><span><img src="./call-slash.png" alt="" /></span>Leave interview</button>
        </div>
    </div>
  )
}

export default Interface
