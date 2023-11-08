import { useState } from "react";
import Buttons from "./Buttons";
import "./Calculator.css";

export default function Calculator() {
    const [value, setValue] = useState('0')

    function updateDisplay(e) {

        setValue(value + e.target.value)

        if (value == 0) {
            if (value[0] == '0') {
                setValue(e.target.value)
            }
        }
    }

    function equals() {
        if(eval(value) > 999999999){
            setValue(eval(value).toFixed(9))
        }

       //Need to round decimals 

        setValue(eval(value))
    }

    function clearDisplay() {
        setValue('0')
    }

    function deleteKey() {
        setValue(value.slice(0, -1))
    }

    function positiveNegative(){
        setValue(value * -1)
    }

    return (
        <div className="calculator d-flex justify-content-center ">
            <div className="calcCard">
                <div className="display mb-1">{value}</div>

                <Buttons
                    updateDisplay={updateDisplay}
                    equals={equals}
                    clearDisplay={clearDisplay}
                    deleteKey={deleteKey}
                    positiveNegative={positiveNegative}
                />
            </div>
        </div>
    )
}