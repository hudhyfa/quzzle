"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: { id: string };
};

// {
//     quiz: {
//       _id: '665a0bef6a5189c2cd53539f',
//       title: 'Animals',
//       author: 'hudyfa',
//       totalNumberOfQuestions: 2,
//       qna: [ [Object], [Object] ],
//       createdAt: '2024-05-31T17:42:07.339Z',
//       updatedAt: '2024-05-31T17:42:07.339Z',
//       __v: 0
//     }
//   }

export default async function SolveQuiz({ params }: Props) {
  // const router = useRouter();
  //     const session = await getServerSession();
  //     if (!session) {
  //       router.replace("/login");
  //     }
  // const [totalNumberOfQuestions, setTotalNumberOfQuestions] = useState("");
  const [currentQuestionCount, setCurrentQuestionCount] = useState(1);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [checked, setchecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const data = await fetchQuizData();
  const quizData = data.quiz;
  const { totalNumberOfQuestions, qna } = quizData;
  const currentQuestionData = qna[currentQuestionCount - 1];

  async function fetchQuizData() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/get-quiz-details?id=${params.id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("error fetching quiz data :" + error);
    }
  }

  function onSelectedAnswer(ans: string, index: number | any) {
    setchecked(true);
    setSelectedAnswerIndex(index);
    if(currentQuestionData.correctAnswer === ans) setScore((prev) => prev + 1);
  }

  function handleNextBtn() {
    setCurrentQuestionCount(prev => prev + 1);
    setchecked(false);
    setSelectedAnswerIndex(null);
    if(currentQuestionCount === qna.length) {
      setShowResult(true);
    }
  }

  return (
    <>
    {showResult ? (
      <div className="">
        <h2>Score: {score}</h2>
      </div>
    ): (
      
      <div className={styles.mainContent}>
        <div className={styles.leftPart}>
          <div className={styles.questionCount}>
            <span style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Question {currentQuestionCount}
            </span>
            <span style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              /{totalNumberOfQuestions}
            </span>
          </div>
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <h1>{currentQuestionData.question}</h1>
            </div>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.content}>
            <div className={styles.message}>
              <h4>Select Answer</h4>
            </div>
            <div className={styles.optionList} id="options">
              {currentQuestionData.answers.map((ans: string, index: number) => {
                return (
                    <>
                        <li key={index} onClick={() => onSelectedAnswer(ans, index)} className={index === selectedAnswerIndex ? styles.selectedOption: styles.nonSelectedOption}>{ans}</li>
                    </>
                )
              })}
              {checked ? (
                <button className={styles.nextButton} onClick={handleNextBtn}>Next</button>
              ): (
                <button disabled className={styles.disabledButton}>Next</button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
