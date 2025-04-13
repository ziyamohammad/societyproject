import React from 'react'
import styles from '../css/interface.module.css'
function Interface() {
  return (
    <div className={styles["main-containers"]}>
        <div className={styles["top-container"]}>
        <div className={styles.logo}>
          <span className={styles.logoimg}>
            <img src="./OBJECTS.png" alt="/" height="100%" width="100%" />
          </span>
          <div className={styles.logoname}>PrepWise</div>
        </div>
<div className={styles["top-logo"]}>
    <img src="./apimg.png" alt="" />
</div>
        </div>
        <div className={styles["second-container"]}>
            <div className={styles["second-left"]}>
                <span style={{ marginRight: '0.5em' }}><img src="./image 18.png" alt="" /></span>
                 Frontend Developer Interview <span style={{ marginLeft: '0.5em' }}><img src="./tech.png" alt="" /><img src="./Frame.png" alt="" /></span>
            </div>
            <div className={styles["second-right"]}>Technical Interview</div>
        </div>
        <div className={styles.boxes}>
            <div className={styles.box}>
                <img src="./avatar-removebg-preview (1).png" alt="" />
                <span>AI Interviewer</span>
            </div>
            <div className={styles.box}>
            <img src="./image (1).png" alt="" />
            <span>Adrian (You)</span>
            </div>
        </div>
        <div className={styles.question}>
        What job experience level are you targeting?
        </div>
        <div className={styles.buttons}>
          <button className={styles.repeat}><span><img src="./repeate-music.png" alt="" /></span> Repeat</button>
          <button className={styles.leave} ><span><img src="./call-slash.png" alt="" /></span>Leave interview</button>
        </div>
    </div>
  )
}

export default Interface