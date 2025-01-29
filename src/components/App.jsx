import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";

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
    default:
      throw new Error("Action Unknonwn");
  }
}
function App() {
  const [{ questions, status, QusIndex, answer, points }, dispatch] =
    useReducer(reducer, initialStat);
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
            {QusIndex === questions.length - 1 ? null : (
              <NextButton
                dispatch={dispatch}
                answer={answer} 
              />
            )}
          </>
        )}
      </Main>
    </div>
  );
}
export default App;
