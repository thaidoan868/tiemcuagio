import { numberWithCommas } from "../../../fuctions";
import styles from "./TotalPayment.module.css"


export default function TotalPayment(props) {
    const carts = props.carts;
    const showCreateOrder = props.showCreateOrder;


    const shippingFee = 0;
    const vat = 0;
    let totalMoney = 0;

    carts.map(cart => {
        if (cart.chosen) {
            totalMoney = totalMoney + (cart.quantity*cart.product_detail.price)
        }
    });
    const totalPayment = totalMoney + shippingFee + vat;
    return <div className={styles.totalPayment}>
        <table>
            <tbody>
                <tr>
                    <td>Tổng tiền bánh</td>
                    <td>{ numberWithCommas(totalMoney) }₫</td>
                </tr>
                <tr>
                    <td>Thuế</td>
                    <td>{ numberWithCommas(vat) }₫</td>
                </tr>
                <tr>
                    <td>Giao hàng</td>
                    <td>{ numberWithCommas(shippingFee) }₫</td>
                </tr>
                <tr>
                    <td colSpan={2}> <hr/> </td>
                </tr>
                <tr className={styles.totalMoney}>
                    <td>Tổng cộng</td>
                    <td>{ numberWithCommas(totalPayment) }₫</td>
                </tr>
            </tbody>
        </table>
        { (showCreateOrder && totalPayment !== 0) && <a href="/checkout/">Tạo đơn</a> }

    </div>
}