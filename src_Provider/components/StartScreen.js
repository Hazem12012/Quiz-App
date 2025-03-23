function StartScreen({ NumQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcom To The React Quiz!</h2>
      <h3>{NumQuestion.length} Questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
