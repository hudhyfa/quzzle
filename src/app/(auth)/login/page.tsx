"use client"

import Link from "next/link";
import styles from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router= useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if(!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if(!password || password.length < 8) {
      setError("Invalid password");
      return;
    }

    try {
      router.push('/login')
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className={styles.mainContent}>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <div className={styles.loginLogo}>
              <h2>Qwzzle.io</h2>
              <h3>Welcome back</h3>
              <p>Please enter your details to sign in.</p>
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
                  E-mail address <br />
                </label>
                  <input type="text" placeholder="enter email" /> <br />
                <label htmlFor="">
                  Password <br />
                </label>
                  <input type="password" placeholder="enter password"  /> <br />
                <button type="submit">Sign In</button>
                <p style={{color:"red", marginTop:"5px"}}>{error && error}</p>
              </form>
              <div className={styles.signupLink}>
                <p>
                  Don't have an account yet?{" "}
                  <span>
                    <Link href={"/signup"} style={{textDecoration:"none", fontWeight:"400", color:"black"}}>Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.leftSide}>
          <img src="/loginSampleFour.avif" alt="sample cover photo" />
        </div>
      </div>
    </div>
  );
}
