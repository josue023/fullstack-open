import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};
const Statitics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatiticsLine text="good" value={good} />
        <StatiticsLine text="neutral" value={neutral} />
        <StatiticsLine text="bad" value={bad} />
        <StatiticsLine text="all" value={all} />
        <StatiticsLine text="average" value={redondear(average)} />
        <StatiticsLine text="positive" value={redondear(positive) + " %"} />
      </tbody>
    </table>
  );
};

const StatiticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const redondear = (num) => {
  return Math.round(num * 10) / 10;
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statitics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
