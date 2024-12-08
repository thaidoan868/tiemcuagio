import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../fuctions";

import ProcessBar from "../../../components/ui/ProcessBar/ProcessBar"
import DeliveryInfo from "../../checkout/DeliveryInfo/DeliveryInfo";
import RetrieveOrderItems from "../../../components/ui/RetrieveOrderItems/RetrieveOrderCart";
import Qr from "../../checkout/Qr/Qr";
import ChangePaymentMethod from "../../../components/ui/ChangePaymentMethod/ChangePaymentMethod";
import CancellOrder from "../../../components/ui/CancellOrder/CancellOrder";
import WaitingSpin from "../../../components/ui/WaitingSpin/WaitingSpin";

import styles from "./RetrieveOrder.module.css"


export default function RetrieveOrder(props) {
    const orderId = props.orderId;
    const url = "/api/orders/"+ orderId + "/detail";
    const { data:order, isLoading, isError, refetch } = useQuery({
        queryKey: ["get_detail or der", url],
        queryFn: () => fetchData(url)
    });
    if (isLoading) return <div className={styles.loading}>
        <WaitingSpin backgroundColor="hsl(0, 0%, 95%)" color="#2659f3"/>
    </div>
    if  (isError) return <div className={styles.error}>
        <p>Không tìm thấy sản phẩm</p>
    </div>

    const id = order.id;

    return <div className={styles.retrieveOrder}>
        <h1>CHI TIẾT ĐƠN HÀNG #{id}</h1>
        <ProcessBar 
            statuses={order.order_statuses}
            created={order.date}
            message={order.message}
        />
        <div className={styles.deliveryInfo}>
            <DeliveryInfo order={order}/>
        </div>
        <div className={styles.items}>
            <RetrieveOrderItems 
                products={order.products}
                totalMoney = {order.total_payment}
            />
        </div>
        {
            order.qr_urls &&
                <div className={styles.qr}>
                    <p className={styles.notification}>Đơn hàng chưa được thanh toán, vui lòng thanh toán đơn hàng!</p>
                    <Qr qrUrls={order.qr_urls}/>
                </div>

        }
        {
            order.change_payment_method_url &&
                <ChangePaymentMethod 
                    url={order.change_payment_method_url}
                    refetch={refetch}
                />
        }
        {
            order.cancell_url &&
                <CancellOrder
                    orderId={order.id}
                    url={order.cancell_url} 
                    refetch={refetch}
                />
        }
    </div>
}