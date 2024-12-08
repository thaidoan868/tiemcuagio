import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../fuctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import styles from "./Success.module.css"


export default function Success(props) {
    const order_detail_url = props.detail_url;
    const { data:order , isLoading, isError} = useQuery({
        queryKey: [order_detail_url],
        queryFn: () => fetchData(order_detail_url, true)
    });

    if (isLoading || isError) return <p> Loading... </p>


    const id = order.id;
    return <div className={styles.success}>
            <p className={styles.icon}> <FontAwesomeIcon icon={faCircleCheck}/></p>
            <div className={styles.text}>
                <p>Đặt hàng thành công</p>
                <p>Mã đơn hàng {" "}#{id}</p>
                <p>Cảm ơn bạn đã mua hàng</p>
                <div className={styles.deliveryInfo}>
                    <DeliveryInfo order={order}/>
                </div>
                <a href="/">Tiếp tục mua hàng</a>
            </div>
    </div>
}