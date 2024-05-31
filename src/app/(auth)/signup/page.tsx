"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Invalid password");
      return;
    }
    if (!confirmPassword || confirmPassword !== password) {
      setError("Confirm your password");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className={styles.mainContent}>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <div className={styles.loginLogo}>
              <h2>Qwzzle.io</h2>
              <h3>Welcome back</h3>
              <p>Please enter your details to Sign Up.</p>
            </div>
            <div className={styles.thirdPartyLogins}>
              <button className={styles.googleBox}>
                <div className={styles.googleLogo}>
                  <img src="/googleLogo.png" alt="" />
                </div>
              </button>
              <button className={styles.googleBox}>
                <div className={styles.googleLogo}>
                  <img src="/githubLogoAgain.png" alt="" />
                </div>
              </button>
              <button className={styles.googleBox}>
                <div className={styles.googleLogo}>
                  <img src="/facebookLogoTwo.png" alt="" />
                </div>
              </button>
            </div>
            <div className={styles.loginForm}>
              <form onSubmit={handleSubmit}>
                <label htmlFor="">
                  Username <br />
                </label>
                <input type="text" placeholder="enter username" /> <br />
                <label htmlFor="">
                  E-mail address <br />
                </label>
                <input type="email" placeholder="enter email" /> <br />
                <label htmlFor="">
                  Password <br />
                </label>
                <input type="password" placeholder="enter password" /> <br />
                <label htmlFor="">
                  Re-enter Password <br />
                </label>
                <input type="password" placeholder="re-enter password" /> <br />
                <button type="submit">Sign Up</button>
                <p style={{ color: "red", marginTop: "5px" }}>
                  {error && error}
                </p>
              </form>
              <div className={styles.signupLink}>
                <p>
                  Already have an account yet?{" "}
                  <span>
                    <Link
                      href={"/login"}
                      style={{
                        textDecoration: "none",
                        fontWeight: "400",
                        color: "black",
                      }}
                    >
                      Sign In
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.leftSide}>
          <img src="/signupSample.avif" alt="sample cover photo" />
        </div>
      </div>
    </div>
  );
}
