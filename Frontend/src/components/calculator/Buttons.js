import "./Calculator.css";

export default function Buttons({updateDisplay, equals, clearDisplay, deleteKey, positiveNegative}) {
    return (
        <div className="container"> 
            <div className="row">
                <button className="calcCol col btn btn-secondary" value="C" onClick={clearDisplay}>C</button>
                <button className="calcCol col btn btn-secondary" value="DE" onClick={deleteKey}>DE</button>
                <button className="calcCol col btn btn-secondary" value="+/-" onClick={positiveNegative}>+/-</button>
                <button className="calcCol col btn btn-secondary" value="/" onClick={updateDisplay}>/</button>
            </div>

            <div className="row">
                <button className="calcCol col btn btn-secondary" value="7" onClick={updateDisplay}>7</button>
                <button className="calcCol col btn btn-secondary" value="8" onClick={updateDisplay}>8</button>
                <button className="calcCol col btn btn-secondary" value="9" onClick={updateDisplay}>9</button>
                <button className="calcCol col btn btn-secondary" value="*" onClick={updateDisplay}>*</button>
            </div>

            <div className="row">
                <button className="calcCol col btn btn-secondary" value="4" onClick={updateDisplay}>4</button>
                <button className="calcCol col btn btn-secondary" value="5" onClick={updateDisplay}>5</button>
                <button className="calcCol col btn btn-secondary" value="6" onClick={updateDisplay}>6</button>
                <button className="calcCol col btn btn-secondary" value="-" onClick={updateDisplay}>-</button>
            </div>

            <div className="row">
                <button className="calcCol col btn btn-secondary" value="1" onClick={updateDisplay}>1</button>
                <button className="calcCol col btn btn-secondary" value="2" onClick={updateDisplay}>2</button>
                <button className="calcCol col btn btn-secondary" value="3" onClick={updateDisplay}>3</button>
                <button className="calcCol col btn btn-secondary" value="+" onClick={updateDisplay}>+</button>
            </div>

            <div className="row">
                <button className="calcCol col btn btn-secondary" value="0" onClick={updateDisplay}>0</button>
                <button className="calcCol col btn btn-secondary" value="." onClick={updateDisplay}>.</button>
                <button className="equals btn btn-secondary" value="=" onClick={equals} >=</button>
            </div>
        </div>
    )
}