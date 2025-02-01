import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialStat = {
  questions: [],
  status: "loading",
  QusIndex: 0,
  answer: null,
  points: 0,
  scoundRemaining: 0,
};

function reducer(state, action, answer, points, scoundRemaining) {
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
        scoundRemaining: state.questions.length * 30,
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
        points: initialStat.points,
        scoundRemaining: initialStat.scoundRemaining,
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
function App() {
  const [
    { questions, status, QusIndex, answer, points, scoundRemaining },
    dispatch,
  ] = useReducer(reducer, initialStat);
  const TotalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

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
            <Progress
              index={QusIndex}
              NumQuestion={questions}
              points={points}
              TotalPoints={TotalPoints}
              answer={answer}
            />{" "}
            {/*    */}
            <Questions
              questions={questions[QusIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              {" "}
              <Timer dispatch={dispatch} scoundRemaining={scoundRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                QusIndex={QusIndex}
                questions={questions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={TotalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
