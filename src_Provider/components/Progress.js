export default function Progress({ NumQuestion, index, points, TotalPoints ,answer}) {
  return (
    <header className="progress">
      <progress value={index + Number (answer !== null)} max={NumQuestion.length}></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1} / {NumQuestion.length}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {TotalPoints}
        </strong>
        points
      </p>
    </header>
  );
}
