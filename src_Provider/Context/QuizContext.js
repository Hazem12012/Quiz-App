/** @format */

import { useContext, createContext, useEffect, useReducer } from "react";
const QuizContext = createContext();
const SECE_PER_QUESTION = 30;
const initialState = {
  questions: [],
  status: "loading",
  points: 0,
  scoundRemaining: 0,
  index: 0,
  answer: null,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        scoundRemaining: state.questions.length * SECE_PER_QUESTION,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnsewer":
      const question = state.questions.at(state.QusIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        QusIndex: state.QusIndex + 1,
        answer: null,
      };
    case "end":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        QusIndex: 0,
        answer: null,
        points: initialState.points,
        scoundRemaining: initialState.scoundRemaining,
      };
    case "tick":
      return {
        ...state,
        scoundRemaining: state.scoundRemaining - 1,

        status: state.scoundRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknonwn");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}>
      {" "}
      children
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}
export { QuizProvider, useQuiz };
