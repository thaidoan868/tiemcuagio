import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { faScroll } from "@fortawesome/free-solid-svg-icons"
import { faFileLines } from "@fortawesome/free-regular-svg-icons/faFileLines"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faAddressCard } from "@fortawesome/free-regular-svg-icons"

import { useState } from "react"

import RetrieveOrder from "../RetrieveOrder/RetrieveOrder"
import UpdateAccount from "../UpdateAccount/UpdateAccount"
import ListOrders from "../ListOrders/ListOrders"
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs"
import SearchOrder from "../SearchOrder/SearchOrder"
import { logout } from "../../../fuctions"

import styles from "./Account.module.css"


export default function Account(props) {
    document.title = "Tài khoản - Tiệm của Gió"
    const [view, setView] = useState("accountInfo");
    const [orderId, setOrderId] = useState(undefined)

    function bodyRender() {
        switch(view) {
            case "accountInfo":
                return <UpdateAccount/>
            case "orders":
                return <ListOrders retrieveOrder={retrieveOrder}/>
            case "order": 
                if (orderId === undefined) {
                    return <SearchOrder retrieveOrder={retrieveOrder}/>
                }
                return <RetrieveOrder orderId={orderId}/>
        }
    }

    function retrieveOrder(pk) {
        setView("order");
        setOrderId(pk);
    }

    function orderOnClick() {
        setView("order");
        setOrderId(undefined);
    }

    return <div className={styles.account}> 
        <Breadcrumbs breads={['Tài khoản']}/>
        <div className={styles.accountContainer}>
                <ul className={styles.navBar}>
                    <li>
                        <button>
                            <span> <FontAwesomeIcon icon={faAddressCard}/> </span>
                            Tổng quan tài khoản
                        </button>
                    </li>
                    <li className={view === "accountInfo" && styles.selected}>
                        <button onClick={() => setView("accountInfo")}>
                            <span> <FontAwesomeIcon icon={faUser}/> </span>
                            Thông tin tài khoản
                        </button>
                    </li>
                    <li className={view === "orders" && styles.selected}>
                        <button onClick={() => setView("orders")}>
                            <span> <FontAwesomeIcon icon={faScroll}/> </span>
                            Danh sách đơn hàng
                        </button>
                    </li>
                    <li className={view === "order" && styles.selected}>
                        <button onClick={orderOnClick}>
                            <span> <FontAwesomeIcon icon={faFileLines}/> </span>
                            Tra cứu đơn hàng
                        </button>
                    </li>
                    <li>
                        <button onClick={logout}>
                            <span> <FontAwesomeIcon icon={faRightFromBracket}/> </span>
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            <div className={styles.body}>
                {bodyRender()}
            </div>
        </div>
    </div>
}