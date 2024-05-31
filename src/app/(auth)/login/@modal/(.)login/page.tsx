import styles from "./page.module.css";
import Link from "next/link";
import Modal from "@/components/modal";

export default function InterceptedLoginPage() {
  return (
    <>
      <Modal>
        <div className={styles.overlay}></div>
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
            <form action="">
              <label htmlFor="">
                E-mail address <br />
              </label>
              <input type="text" placeholder="enter email" /> <br />
              <label htmlFor="">
                Password <br />
              </label>
              <input type="password" placeholder="enter password" /> <br />
              <label htmlFor="">
                Re-enter Password <br />
              </label>
              <input type="password" placeholder="re-enter password" /> <br />
              <button>Sign Up</button>
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
      </Modal>
    </>
  );
}
