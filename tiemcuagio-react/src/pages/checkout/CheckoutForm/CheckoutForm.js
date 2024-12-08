import CheckoutInput from "../../../components/ui/CheckoutInput/CheckoutInput"
import PaymentMethodInput from "../../../components/ui/PaymentMethodInput/PaymentMethodInput";
import SelectAddress from "../../../components/ui/SelectAddress/SelectAddress"
import styles from "./CheckoutForm.module.css"


export default function CheckoutForm(props) {
    const onSubmit = props.onSubmit;
    function handleOnSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formValues = Object.fromEntries(formData);
        formValues.address = `${formValues.address}, ${formValues.ward}, ${formValues.district}, ${formValues.province}`;
        delete formValues.ward;
        delete formValues.district;
        delete formValues.province;
        onSubmit(formValues);
    }
    
    return <div className={styles.checkoutForm}>
            <div className={styles.userInfo}>
                <h1>Thông tin giao hàng</h1>
                <form onSubmit={handleOnSubmit}>
                    <CheckoutInput
                    key="1"
                        name="name"
                        placeholder="Họ và tên"
                        required={true}
                    />
                    <CheckoutInput
                    key="2"
                        type="number"
                        name="phone_number"
                        placeholder="Số điện thoại"
                        required={true}
                    />
                    <CheckoutInput
                    key="3"
                        name="address"
                        placeholder="Địa chỉ"
                        required={true}
                    />
                    <SelectAddress/>
                    <div className={styles.message}>
                        <label htmlFor="message">Ghi chú</label>
                        <textarea name="message" id="message" placeholder="Không thích ăn ngọt..."></textarea>
                    </div>
                    <p>Phương thức thanh toán</p>
                    <PaymentMethodInput/>
                    <button>Đặt hàng</button>
                </form>
            </div>

    </div>
}