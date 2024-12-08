import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

import { useQuery } from "@tanstack/react-query";

import { fetchData } from "../../../fuctions";
import styles from "./Qr.module.css"


export default function Qr(props) {
    const qr_urls = props.qrUrls;
    const img = qr_urls.vietqr_url;
    const qr_status_url = qr_urls.qr_status_url;
    const { data:qr } = useQuery({
        queryKey: [qr_status_url],
        queryFn: () => fetchData(qr_status_url, true),
        refetchInterval: data => {
            if (data.status === "paid") {
                return 0
            }
            return 2000
        }
    });

    if (qr && qr.status === "paid") {
        return <div className={styles.successQr}>
            <p className={styles.icon}><FontAwesomeIcon icon={faCircleCheck}/></p>
            <p>Thanh toán <br/>thành công</p>
            <p className={styles.thankYou}>Cảm ơn bạn đã mua hàng!</p>
        </div>
    }

    return <div className={styles.qr}>
        <p>Quét mã qua ứng dụng ngân hàng</p>
        <p> <img src={img} alt="" /> </p>
        <p className={styles.qrId}>Mã thanh toán đơn hàng:</p>
        <p className={styles.qrId}>{qr_urls.id}</p>
    </div>
}
