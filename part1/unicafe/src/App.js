import { useState } from 'react'

const StatisticLine = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    )
}

const Statistics = (props) => {
    if (props.good_amount > 0 || props.neutral_amount > 0 || props.bad_amount > 0) {
        return (
            <div>
                <StatisticLine text="good" value={props.good_amount} />
                <StatisticLine text="neutral" value={props.neutral_amount} />
                <StatisticLine text="bad" value={props.bad_amount} />
                <StatisticLine text="average" value={(props.good_amount - props.bad_amount) / (props.good_amount + props.neutral_amount + props.bad_amount)} />
                <StatisticLine text="positive" value={(props.good_amount * 100 / (props.good_amount + props.neutral_amount + props.bad_amount)) + " %"} />
            </div>
        )

    }
    return (
        <div>
            <p>No feedback given</p>
        </div>
    )

}

const Button = (props) => {
    return (
        <button onClick={props.handleButton}>{props.name}</button>
    )
}
const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }


    return (
        <div>
            <h1>give feedback</h1>
            <Button name="good" handleButton={handleGoodClick} />
            <Button name="neutral" handleButton={handleNeutralClick} />
            <Button name="bad" handleButton={handleBadClick} />
            <h1>statistics</h1>
            <Statistics good_amount={good} neutral_amount={neutral} bad_amount={bad} />

        </div>
    )
}

export default App