"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";


export default function CreateQuizPage(): React.ReactNode {

    const {data: session, status: sessionStatus} = useSession();
  const router= useRouter();

  useEffect(() => {
    if(sessionStatus === "unauthenticated") {
      router.replace('/login')
    }
  }, [sessionStatus, router]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tnqs, setTnqs] = useState(0);
  const [qna, setQna] = useState([]);

  const [currentQuestionCount, setCurrentQuestionCount] = useState(1);
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const qnaObject = {
    question: question,
    answers: [optionOne, optionTwo, optionThree, optionFour],
    correctAnswer: correctAnswer,
  };

  function handleSubForm(e: any) {
    e.preventDefault();
    setQna((): any => {
      return [...qna, qnaObject];
    });
    setCurrentQuestionCount((prev) => prev + 1);
    setQuestion("");
    setOptionOne("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
    setCorrectAnswer("");
    if(tnqs === currentQuestionCount) setReadyToSubmit(true);
  }

  async function handleMainForm(e: any) {
    e.preventDefault();
    const res = await fetch('/api/add-quiz',{
        method:"POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            author: author,
            tnqs: tnqs,
            qna: qna
        })
    })

    if(res?.status === 200) {
        toast.success("Thanks for your Qwzzle contribution")
        router.push('/quizfeed');
    } else {
        toast.error("Something went wrong, try again");
        router.refresh();
    }
  }

  if(sessionStatus === "loading") {
    return <Loading />;
  };

  return (
    <>
      <form id="main-form" onSubmit={handleMainForm}></form>
      <form id="sub-form" onSubmit={handleSubForm}></form>
      <div className={styles.formContainer}>
        <div className={styles.quizForm}>
          <div className={styles.quizFormGreet}>
            <h1 style={{ fontWeight: "400" }}>Contribute a Qwzzle</h1>
          </div>
          <div className={styles.quizDetails}>
            <div className={styles.authorDetails}>
              <label>Title:</label>
              <br />
              <input
                type="text"
                placeholder="Enter title"
                form="main-form"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.authorDetails}>
              <label>Author:</label>
              <br />
              <input
                type="text"
                placeholder="Enter author name"
                form="main-form"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className={styles.questionNumbers}>
              <label>Total Qn nos:</label>
              <br />
              <input
                type="text"
                placeholder="Enter total number of questions"
                form="main-form"
                onChange={(e) => setTnqs(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className={styles.question}>
            <label>Question:</label>
            <br />
            <input
              type="text"
              placeholder="Enter the question"
              form="sub-form"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className={styles.answersBox}>
            <div className={styles.answerOption}>
              <label>Option 1:</label>
              <br />
              <input
                type="text"
                placeholder="Enter first answer option"
                form="sub-form"
                value={optionOne}
                onChange={(e) => setOptionOne(e.target.value)}
              />
            </div>
            <div className={styles.answerOption}>
              <label>Option 2:</label>
              <br />
              <input
                type="text"
                placeholder="Enter second answer option"
                form="sub-form"
                value={optionTwo}
                onChange={(e) => setOptionTwo(e.target.value)}
              />
            </div>
            <div className={styles.answerOption}>
              <label>Option 3:</label>
              <br />
              <input
                type="text"
                placeholder="Enter third answer option"
                form="sub-form"
                value={optionThree}
                onChange={(e) => setOptionThree(e.target.value)}
              />
            </div>
            <div className={styles.answerOption}>
              <label>Option 4:</label>
              <br />
              <input
                type="text"
                placeholder="Enter fourth answer option"
                form="sub-form"
                value={optionFour}
                onChange={(e) => setOptionFour(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.question}>
            <label>Enter correct answer:</label>
            <br />
            <input
              type="text"
              placeholder="Enter the question"
              form="sub-form"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
          </div>
          {tnqs > 0 && !readyToSubmit && (
            <div className={styles.answerBtns}>
              <button
                type="submit"
                form="sub-form"
              >
                {currentQuestionCount}/{tnqs}{" "}
                ADD QUESTION
              </button>
            </div>
          )}
          {readyToSubmit && (
            <div className={styles.answerBtns}>
              <button
                type="submit"
                form="main-form"
              >
                ADD QUIZ
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
