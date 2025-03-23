function NextButton({ dispatch, answer, questions, QusIndex }) {
  if (answer === null) return null;

  return (
    <div>
      <button
        className={"btn btn-ui"}
        onClick={
          QusIndex === questions.length - 1
            ? () => dispatch({ type: "end" })
            : () => dispatch({ type: "nextQuestion" })
        }
      >
        {QusIndex === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default NextButton;
