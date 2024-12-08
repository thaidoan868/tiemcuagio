import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@tanstack/react-query"

import Account from "../../../components/ui/Account/Account"
import { Notification } from "../../../components/ui/Notification/Notification"
import { fetchData, logout } from "../../../fuctions"
import NavbarNotification from "../../../components/ui/NavbarNotification/NavbarNotification"

import styles from "./AccountNavBar.module.css"

export default function AccountNavBar(props) {
    const { data} = useQuery({ 
            queryKey : ['navbar'],
            queryFn : () => fetchData("/api/user/navbar/"),
            refetchInterval: 5000
    });


    if (data) return <div className={styles.accountNavBar}>
            <Account
                title={data?.full_name}
                description="Đăng xuất" 
                descriptionOnClick={logout}
                avatar={data?.avatar}
                link="/account/"
            />
            <a href="/cart/" className={styles.cartButton}>
                <Notification icon={faCartShopping} number={data?.carts} color="#0040b8"/>
            </a>
            <NavbarNotification unread={data?.notifications}/>
    </div>
}