import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./ProcessBar.module.css"


export default function ProcessBar(props) {
    const message = props.message;
    const created = props.created;
    const inputStatuses = props.statuses;

    const cancellStatuses = [
        {
            "status": "created",
            "display": "Tạo đơn",
            "icon": faCartShopping,
            "message": message,
            "date": created,
        },
        {
            "status": "unpaid",
            "display": "Thanh toán",
            "icon": faQrcode,
            "message": "",
            "date": ""
        },
        {
            "status": "paid",
            "display": "Chờ xác nhận",
            "icon": faFileCircleQuestion,
            "message": "",
            "date": ""
        },
        {
            "status": "customer_cancelled",
            "display": "Bạn hủy đơn",
            "icon": faFileCircleXmark,
            "message": "",
            "date": ""
        },
        {
            "status": "admin_cancelled",
            "display": "Admin hủy đơn",
            "icon": faFileCircleXmark,
            "message": "",
            "date": ""
        },
    ]
    const normalStatuses = [
        {
            "status": "created",
            "display": "Tạo đơn",
            "icon": faCartShopping,
            "message": message,
            "date": created,
        },
        {
            "status": "unpaid",
            "display": "Thanh toán",
            "icon": faQrcode,
            "message": "",
            "date": ""
        },
        {
            "status": "paid",
            "display": "Chờ xác nhận",
            "icon": faFileCircleQuestion,
            "message": "",
            "date": ""
        },
        {
            "status": "accepted",
            "display": "Đã xác nhận",
            "icon": faFileCircleCheck,
            "message": "",
            "date": ""
        },
        {
            "status": "done_shipped",
            "display": "Đang giao hàng",
            "icon": faTruckFast,
            "message": "",
            "date": ""
        },
        {
            "status": "completed",
            "display": "Hoàn thành",
            "icon": faCircleCheck,
            "message": "",
            "date": ""
        },
    ];

    let statusesType = "";
    let statuses = normalStatuses;

    inputStatuses.map(status => {
        if (isCancell(status.status)) {
            statusesType = "cancellStatuses"
            statuses = cancellStatuses;
        }
    })

    inputStatuses.map(inputStatus => {
        statuses.map(status => {
            if (inputStatus.status === status.status) {
                status.message = inputStatus.message;
                status.date = inputStatus.date
            }
        })
    })


    function isCancell(status) {
        if (status === "admin_cancelled" || status === "customer_cancelled") {
            return true;
        }
        return false;
    }

    function statusRender(status) {
        if (isCancell(status.status) || status.date === "") {
            return <FontAwesomeIcon icon={faXmarkCircle}/>
        }
        return  <FontAwesomeIcon icon={faCircleCheck}/>
    }

    function displayStatus(status) {
        if (statusesType === "cancellStatuses" && status.date === "") {
            return false;
        }
        if (status.status === "unpaid" && status.date === "") {
            return false;
        }
        return true;
    }

    function ulClasName(status) {
        let className = "";
        if (status.date === "") {
            return styles.noStatus;
        }
        else if (isCancell(status.status)) {
            return styles.cancellStatus
        }
    }

    return <div className={styles.processBar}>
        {
            statuses.map((status, i) =>
                displayStatus(status) && 
                <ul 
                    key={i} 
                    className={ulClasName(status)}
                >
                    <li className={styles.icon}>
                        <FontAwesomeIcon icon={status.icon}/>
                    </li>
                    <li className={styles.step}>
                        <p className={styles.line}></p>
                        <p className={styles.circle}>
                        {
                            statusRender(status)
                        }
                        </p>
                    </li>
                    <li className={styles.date}>
                        {status.date}
                    </li>
                    <li className={styles.display}>
                        {status.display}
                    </li>
                    {
                        status.message &&
                        <li className={styles.message}>
                            {status.message}
                        </li>
                    }
                </ul>
            )
        }
    </div>
}