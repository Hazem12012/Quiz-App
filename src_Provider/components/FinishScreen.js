import RestartButton from "./RestartButton";
function FinishScreen({ maxPossiblePoints, dispatch, points }) {
  const persentage = (points / maxPossiblePoints) * 100;
  let emoji;

  if (persentage >= 85 && persentage <= 100) {
    emoji = "🥇 👍";
  } else if (persentage >= 65 && persentage < 85) {
    emoji = "🥈";
  } else if (persentage >= 50 && persentage < 65) {
    emoji = "🥉";
  } else {
    emoji = "👎";
  }
  return (
    <>
      <p className="result">
        {" "}
        <span>{emoji}</span> You scroed <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(persentage)} %){" "}
      </p>
      <RestartButton dispatch={dispatch} />
    </>
  );
}

export default FinishScreen;
