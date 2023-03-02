import { nanoid } from 'nanoid';
import React from 'react'
import Confetti from 'react-confetti';
import Die from './Die';


export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice])

  function allNewDice() {
    const oldDice = [];

    for (let i = 0; i < 10; ++i) {
      oldDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      });
    }

    return oldDice;
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(el => {
      return el.id === id ? { ...el, isHeld: !el.isHeld } : el
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(el => {
        return el.isHeld ? el : { ...el, value: Math.ceil(Math.random() * 6) }
      }))
    }
    else{
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  const diceElements = dice.map(el =>
    <Die
      key={el.id}
      id={el.id}
      value={el.value}
      isHeld={el.isHeld}
      holdDice={() => holdDice(el.id)}
    />
  )
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      {tenzies && <Confetti/>}
      <button onClick={rollDice} className='roll-dice'>{tenzies ? 'New Game' : 'Roll'}</button>
    </main>
  )
}
