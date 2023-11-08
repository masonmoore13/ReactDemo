import "./Counter.css"

export function CounterButton({ value, incrementCount, decrementCount }) {
    return (
        <div className="counter">
            <div>
                <button className="counterBtn btn btn-danger" onClick={() => decrementCount(value)}>
                    -{value}
                </button>
                <button className="counterBtn btn btn-primary" onClick={() => incrementCount(value)}>
                    +{value}
                </button>
            </div>
        </div>
    )
}