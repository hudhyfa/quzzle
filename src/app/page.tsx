import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.leftSide}>
          <img src="/homePageCover.avif" alt="sample cover photo" />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <h1>Welcome to the Qwzzle.io</h1>
            <p>
              Are you passionate about learning and testing your knowledge? Or
              maybe you enjoy a friendly challenge? Look no further! The
              Qwzlle.io is your one-stop shop for both creating and
              participating in engaging quizzes.
            </p>
            <div className="mainButtons">
              <Link href={"/create-quiz"}>
                <Button color="white" bgColor="black" title="Create" />
              </Link>
              &nbsp;&nbsp;
              <Link href={"/quizfeed"}>
                <Button color="white" bgColor="black" title="Let's go" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
