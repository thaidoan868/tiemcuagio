import { numberWithCommas } from "../../../fuctions";
import styles from "./DeliveryInfo.module.css"


export default function DeliveryInfo(props) {
    const order = props.order;

    const name = order.name;
    const phoneNumber = order.phone_number;
    const address = order.address;
    let paymentMethod = order.payment_method;
    if (paymentMethod === "cod") {
        paymentMethod = "Thanh toán khi nhận hàng (COD)";
    }
    else if (paymentMethod === "credit_card") {
        paymentMethod = "Thanh toán điện tử";
    }
    return <div className={styles.deliveryInfo}>
            <h1 >Thông tin giao hàng</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Tên:</td>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <td>SĐT:</td>
                        <td>{phoneNumber}</td>
                    </tr>
                    <tr>
                        <td>Địa chỉ:</td>
                        <td>{address}</td>
                    </tr>
                </tbody>
            </table>
            <p className={styles.paymentMethod}>Phương thức thanh toán: <span> {paymentMethod}</span></p>
            {
                order.credit_card
                    ? <p>
                        Đã thanh toán điện tử: 
                        <span className={styles.money}>{numberWithCommas(order.credit_card)}</span>
                        <span className={styles.money}>₫</span>
                    </p>
                    : ""
            }
            {
                order.cash
                    ? <p>
                        Thu tiền mặt: 
                        <span className={styles.money}>{numberWithCommas(order.cash)}</span>
                        <span className={styles.money}>₫</span>
                    </p>
                    : ""
            }
    </div>
}