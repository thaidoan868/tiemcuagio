
import { useQuery } from "@tanstack/react-query";

import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import { fetchData, numberWithCommas } from "../../../fuctions";
import Qr from "../Qr/Qr";
import styles from "./QrPayment.module.css"


export default function QrPayment(props) {
    const order_detail_url = props.detailUrl;
    const { data:order , isLoading, isError} = useQuery({
        queryKey: [order_detail_url],
        queryFn: () => fetchData(order_detail_url, true)
    });

    if (isLoading || isError) return <p> Loading... </p>

    const total_payment = order.total_payment;
    const qrUrls = order.qr_urls;
    
    return <div className={styles.qrPayment}>
        <div className={styles.orderInfo}>
            <h1>Thông tin đơn hàng</h1>
            <hr />
            <p>Số tiền thanh toán</p>
            <p className={styles.price}>{numberWithCommas(total_payment)} <sup>VND</sup></p>
            <div className={styles.deliveryInfo}>
                <DeliveryInfo order={order}/>
            </div>
        </div>
        <Qr qrUrls={qrUrls}/>
    </div>
}