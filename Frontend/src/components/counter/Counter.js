import { useState } from "react";
import "./Counter.css";
import { CounterButton } from "./CounterButton";

export default function Counter() {
    const [count, setCount] = useState(0)

    function incrementCount(value) {
        setCount(count + value)
    }

    function decrementCount(value) {
        setCount(count - value)
    }

    function resetCount() {
        setCount(0)
    }

    return (
        <div className="counterBackground d-flex justify-content-center">
            <div className="counterCard card">
                <div className="text-center">
                    <div className="counterDisplay ">
                        {count}
                    </div>
                    <CounterButton
                        value={1}
                        incrementCount={incrementCount}
                        decrementCount={decrementCount} />
                    <CounterButton
                        value={50}
                        incrementCount={incrementCount}
                        decrementCount={decrementCount} />
                    <button className="counterBtn btn btn-warning"
                        onClick={resetCount}
                    >Reset</button>
                </div>
            </div>
        </div>
    )
}