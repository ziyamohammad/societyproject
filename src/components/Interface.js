import React, { useState, useEffect } from "react";
import styles from "../css/interface.module.css";
import { getAuth } from "firebase/auth";
import Vapi from "@vapi-ai/web";

function Interface() {
  const [inCall, setInCall] = useState(false);
  const [message, setMessage] = useState("");
  const [vapi, setVapi] = useState(null);

  // Initialize Vapi once
  useEffect(() => {
    const vapiInstance = new Vapi(process.env.REACT_APP_VAPI_API_KEY);
    setVapi(vapiInstance);
  }, []);

  const handleCallToggle = () => {
    if (!vapi) return; // if not ready

    if (!inCall) {
      vapi.start(process.env.REACT_APP_VAPI_ASSISTANT_ID);
      vapi.on("message", (msg) => {
        setMessage(msg.transcript || ""); // Assuming msg has a 'transcript' field
      });
      console.log("Call started");
    } else {
      vapi.stop();
      console.log("Call ended");
      setMessage(""); // Optionally clear message on end
    }

    setInCall((prev) => !prev);
  };

  return (
    <div className={styles["main-containers"]}>
      <div className={styles["top-container"]}>
        <div className={styles.logo}>
          <span className={styles.logoimg}>
            <img src="./OBJECTS.png" alt="Logo" height="100%" width="100%" />
          </span>
          <div className={styles.logoname}>PrepWise</div>
        </div>
        <div className={styles["top-logo"]}>
          <img src="./apimg.png" alt="Profile" />
        </div>
      </div>

      <div className={styles["second-container"]}>
        <div className={styles["second-left"]}>
          <span style={{ marginRight: "0.5em" }}>
            <img src="./image 18.png" alt="Tag" />
          </span>
          Frontend Developer Interview
          <span style={{ marginLeft: "0.5em" }}>
            <img src="./tech.png" alt="Tech" />
            <img src="./Frame.png" alt="Frame" />
          </span>
        </div>
        <div className={styles["second-right"]}>Technical Interview</div>
      </div>

      <div className={styles.boxes}>
        <div className={styles.box}>
          <img src="./avatar-removebg-preview (1).png" alt="AI Interviewer" />
          <span>AI Interviewer</span>
        </div>
        <div className={styles.box}>
          <img src="./image (1).png" alt="Adrian" />
          <span>Adrian (You)</span>
        </div>
      </div>

      <div className={styles.question}>
        {message }
      </div>

      <div className={styles.buttons}>
        <button
          className={inCall ? styles.leave : styles.start}
          onClick={handleCallToggle}
        >
          {inCall ? "End Call" : "Call"}
        </button>
      </div>
    </div>
  );
}

export default Interface;
