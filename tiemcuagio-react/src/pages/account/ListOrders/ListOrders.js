import { useQuery } from "@tanstack/react-query";
import styles from "./ListOrders.module.css"
import { fetchData, numberWithCommas } from "../../../fuctions";


export default function ListOrders(props) {
    const retrieveOrder = props.retrieveOrder;
    const url = "/api/orders/list_create/";
    const { data:orders, isLoading, isError} = useQuery({
        queryKey: [url],
        queryFn: () => fetchData(url)
    });

    function orderRender(order, index) {
        const yellow = "hsl(34 100% 50%)";
        const statuses = { 
            "unpaid": {
                "display": "Chưa thanh toán",
                "color": yellow
            },
            "paid": {
                "display": "Chờ xác nhận",
                "color": yellow
            },
            "customer_cancelled": {
                "display": "Bạn hủy đơn",
                "color": "red"
            },
            "admin_cancelled": {
                "display": "Admin hủy đơn",
                "color": "red"
            },
            "accepted": {
                "display": "Đã xác nhận",
                "color": yellow
            },
            "done_shipped": {
                "display": "Đang giao hàng",
                "color": yellow
            },
            "completed": {
                "display": "Hoàn thành",
                "color": "green"
            }
        };

        const id = order.id;
        const date = order.date;
        const paymentMethod = order.payment_method.toUpperCase();
        const totalPayment = numberWithCommas(order.total_payment);
        const status = statuses[order.status].display;
        const color = statuses[order.status].color;
        
        return <tr key={index}>
            <td className={styles.id}>#{id}</td>
            <td>{date}</td>
            <td>{paymentMethod}</td>
            <td>{totalPayment}₫</td>
            <td style={{color: color}}>{status}</td>
            <td>
                <button onClick={() => retrieveOrder(id)}
                on>Xem chi tiết</button>
            </td>
        </tr>
        
    }

    if (isLoading || isError) return <div>loading</div>
    return <div className={styles.listOrders}>
        <h1>ĐƠN HÀNG CỦA BẠN</h1>
        <table>
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày đặt hàng</th>
                    <th>Thanh toán</th>
                    <th>Thành tiền</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { orders.map(orderRender) }
            </tbody> 
        </table>


    </div>
}