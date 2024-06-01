import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

export default async function QuizFeed() {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  async function fetchQuizData() {
    try {
      const response = await fetch("http://localhost:3000/api/get-quiz");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("error fetching quiz data :" + error);
    }
  }
  const data = await fetchQuizData();
  return (
    <div className={styles.feedContainer}>
      <div className={styles.feedHeader}>
        <div className={styles.feedGreet}>
          <h2>Solve em Qwzzles</h2>
        </div>
        <div className={styles.addQuizButton}>
          <Link href={"/create-quiz"}>
            <button>Contribute</button>
          </Link>
        </div>
      </div>
      <div className={styles.feedQuizBox}>
        {data.quizes.map((quiz: any) => {
          const date = new Date(quiz.createdAt);
          const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
          return (
            <>
              <div className={styles.quizBox} key={quiz._id}>
                <div className={styles.titleBox}>
                  <span>{quiz.title}</span>
                </div>
                <div className={styles.detailBox}>
                  <p>Author: {quiz.author}</p>
                  <p>Qns: {quiz.totalNumberOfQuestions}</p>
                  <p>created_at: {formattedDate}</p>
                </div>
                <div className={styles.goQwzzle}>
                    <Link href={`/solve-quiz/${quiz._id}`}>
                  <button>Solve</button>
                    </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
