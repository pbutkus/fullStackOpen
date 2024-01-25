import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
}

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad;
  const average = Math.round(((props.good - props.bad) / total) * 100) / 100;
  const positive = Math.round((props.good / total * 100) * 100) / 100;

  return (
    <div>
      <h2>statistics</h2>
      {
        (props.good != 0 || props.neutral != 0 || props.bad != 0) ? (
          <table>
            <tbody>
              <StatisticsLine text="good" value={props.good} />
              <StatisticsLine text="neutral" value={props.neutral} />
              <StatisticsLine text="bad" value={props.bad} />
              <StatisticsLine text="all" value={total} />
              <StatisticsLine text="average" value={average} />
              <StatisticsLine text="positive" value={positive + " %"} />
            </tbody>
          </table>
        ) : (
          <p>No feedback given</p>
        )

      }
    </div>
  );
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h2>give feedback</h2>
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App