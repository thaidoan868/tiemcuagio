import styles from "./CheckoutInput.module.css"
import { useRef } from "react";
import { createRef } from "react";


export default function CheckoutInput(props) {
    const placeholder = props.placeholder;
    const name = props.name;
    const type = props.type;
    const required = props.required;

    const inputRef = createRef();
    const checkoutRef = createRef();

    function handelOnChange() {
        if (type === "number") {
            inputRef.current.value = inputRef.current.value.replace(/[^0-9]/g, '');
        }
        let inputValue = inputRef.current.value;
        let checkoutInputDiv = checkoutRef.current;

        if (inputValue === "") {
            checkoutInputDiv.classList.remove(styles.inputChanged)
        }
        else {
            checkoutInputDiv.classList.add(styles.inputChanged)
        }
    }
    return <div className={styles.checkoutInput} ref={checkoutRef}>
                    <label>{placeholder}</label>
                    <input 
                        ref={inputRef} 
                        type="text" 
                        name={name}
                        placeholder={placeholder} 
                        onChange={handelOnChange}
                        required={required}
                    />
    </div>
}