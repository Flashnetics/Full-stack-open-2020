import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const scoreAvg = ((good) + (bad * -1)) / all;
  const positive = (good * 100) / all;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic value={all} text="all" />
        <Statistic value={scoreAvg}text="average"/>
        <Statistic value={positive + " %"}text="positive"/>
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  );
};

const App = () => {
 
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      
      <Button onClick={handleGoodClick} text="good" />
      &nbsp;
      <Button onClick={handleNeutralClick} text="neutral" />
      &nbsp;
      <Button onClick={handleBadClick} text="bad" />
      
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
