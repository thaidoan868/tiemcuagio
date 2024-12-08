import { useRef } from "react";

import styles from "./NumberInput.module.css"


export default function NumberInput(props) {
    const inputRef = props.inputRef;
    const inputFontSize = props.inputFontSize;
    const handleOnChange = props.onChange;
    const defaultValue = props.default ? props.default : 1;
    
    function getInput() {
        return parseInt(inputRef.current.value)
    }

    function validateInput() {
        if (getInput() < 1) {
            inputRef.current.value = 1
        }
        else if (getInput() > 1000) {
            inputRef.current.value = 1000
        }
    }

    function decreaseQuantity() {
        inputRef.current.value = getInput() - 1;
        validateInput();
        handleOnChange && handleOnChange();
    }

    function increaseQuantity() {
        inputRef.current.value = getInput() + 1;
        validateInput();
        handleOnChange && handleOnChange();
    }

    function inputChange() {
        inputRef.current.value = inputRef.current.value.replace(/[^0-9]/g, '');
        validateInput();
        handleOnChange && handleOnChange();
    }
    const style = {fontSize: inputFontSize}

    return <div className={styles.numberInput}>
                        <button onClick={decreaseQuantity}>-</button>
                            <input 
                                ref={inputRef} 
                                type="text" 
                                defaultValue={defaultValue} 
                                onChange={inputChange}
                                style={style}
                            />
                        <button onClick={increaseQuantity}>+</button>
    </div>
}