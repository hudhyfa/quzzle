"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/quizfeed");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!password || password.length < 8) {
      setError("Invalid password");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/quizfeed");
    } else {
      setError("");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>...loading</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
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
                  <input type="password" placeholder="enter password" /> <br />
                  <button type="submit">Sign In</button>
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {error && error}
                  </p>
                </form>
                <div className={styles.signupLink}>
                  <p>
                    Don't have an account yet?{" "}
                    <span>
                      <Link
                        href={"/signup"}
                        style={{
                          textDecoration: "none",
                          fontWeight: "400",
                          color: "black",
                        }}
                      >
                        Sign Up
                      </Link>
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
    )
  );
}
