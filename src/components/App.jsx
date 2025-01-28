import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";

const initialStat = {
  questions: [],
  status: "loading",
  QusIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action, answer, points) {
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
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnsewer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + state.questions[state.QusIndex].points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        QusIndex: state.QusIndex + 1,
      };
    default:
      throw new Error("Action Unknonwn");
  }
}
function App() {
  const [{ questions, status, QusIndex, answer }, dispatch] = useReducer(
    reducer,
    initialStat
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen NumQuestion={questions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Questions
              questions={questions[QusIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
export default App;
