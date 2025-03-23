/** @format */

import { useEffect, useReducer } from "react";
import Header from "./Context/Components/Header";
import Main from "./Context/Components/Main";
import Loading from "./Context/Components/Loader";
import Error from "./Context/Components/Error";
import StartScreen from "./Context/Components/StartScreen";
import Questions from "./Context/Components/Questions";
import NextButton from "./Context/Components/NextButton";
import Progress from "./Context/Components/Progress";
import FinishScreen from "./Context/Components/FinishScreen";
import Timer from "./Context/Components/Timer";
import Footer from "./Context/Components/Footer";
import { useQuiz } from "../contexts/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress /> {/*    */}
            <Questions />
            <Footer>
              {" "}
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
export default App;
