import vietqr from "./vietqr.png"
import cod from "./cod.svg"
import styles from "./PaymentMethodInput.module.css"

export default function PaymentMethodInput(props) {
    return <div className={styles.paymentMethodInput}>
        <div className={styles.paymentMethod}>
            <div className={styles.paymentMethodForm}>
                <input 
                    type="radio" 
                    name="payment_method" 
                    id="cod" 
                    value="cod" 
                    required
                    defaultChecked
                />
                <label htmlFor="cod">  
                    <img src={cod} alt="" />
                    Thanh toán khi nhận hàng
                </label>
            </div>
            <hr />
            <div className={styles.paymentMethodForm}>
                <input 
                    type="radio" 
                    name="payment_method" 
                    id="creditCart" 
                    value="credit_card" 
                />
                <label htmlFor="creditCart">
                    <img src={vietqr} alt="" className={styles.vietqr}/>
                    Thanh toán điện tử
                </label>
            </div>
        </div>
    </div>
}