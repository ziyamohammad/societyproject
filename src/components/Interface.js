import React, { useState } from "react";
import styles from "../css/interface.module.css";
import { getAuth } from "firebase/auth";

function Interface() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "Frontend Developer",
          type: "technical",
          level: "junior", // or "mid", "senior" — update as per flow
          techstack: "React, JavaScript, CSS",
          amount: 5,
          userid: user.uid,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setQuestions(data.questions);
        console.log("Generated Questions:", data.questions);
      } else {
        console.error("Generation failed", data);
      }
    } catch (err) {
      console.error("Request error", err);
    } finally {
      setLoading(false);
    }
  };

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
          <span style={{ marginRight: "0.5em" }}>
            <img src="./image 18.png" alt="" />
          </span>
          Frontend Developer Interview
          <span style={{ marginLeft: "0.5em" }}>
            <img src="./tech.png" alt="" />
            <img src="./Frame.png" alt="" />
          </span>
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
        <button className={styles.repeat}>
          <span>
            <img src="./repeate-music.png" alt="" />
          </span>
          Repeat
        </button>
        <button className={styles.leave}>
          <span>
            <img src="./call-slash.png" alt="" />
          </span>
          Leave interview
        </button>
      </div>

      <div style={{ marginTop: "2em" }}>
        <button
          onClick={handleGenerate}
          style={{
            padding: "1em 2em",
            fontSize: "1em",
            borderRadius: "8px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Start Interview"}
        </button>
      </div>

      {questions.length > 0 && (
        <div style={{ marginTop: "2em" }}>
          <h3>Generated Questions</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Interface;
