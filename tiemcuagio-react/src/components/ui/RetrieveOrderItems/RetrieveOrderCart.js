import { numberWithCommas } from "../../../fuctions";
import styles from "./RetrieveOrderItems.module.css"


export default function RetrieveOrderItems(props) {
    const products = props.products;
    const totalMoney = props.totalMoney;
    return <div className={styles.retrieveOrderItems}>
        <table className={styles.products}>
            <thead>
                <tr>
                    <td>Stt</td>
                    <td className={styles.name}> Sản phẩm</td>
                    <td>Đơn giá</td>
                    <td>Số lượng</td>
                    <td>Tổng</td>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product, i) => 
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td className={styles.name}>{product.name}</td>
                            <td>{numberWithCommas(product.price)}₫</td>
                            <td className={styles.quantity}>{product.quantity}</td>
                            <td>{numberWithCommas(product.total_money)}₫</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        <table className={styles.payment}>
            <tbody >
                <tr>
                    <td>Thuế</td>
                    <td>0₫</td>
                </tr>
                <tr>
                    <td>Phí vận chuyển</td>
                    <td>0₫</td>
                </tr>
                <tr>
                    <td>Tổng tiền</td>
                    <td>
                        <span className={styles.money}>
                            {numberWithCommas(totalMoney)}
                        </span>
                        <span className={styles.money}> ₫ </span>
                    </td>
                </tr>

            </tbody>
        </table>

    </div>
}