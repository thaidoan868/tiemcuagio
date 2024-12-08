import { faPhone } from "@fortawesome/free-solid-svg-icons"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import Search from "../../../components/ui/Search/Search"
import Account from "../../../components/ui/Account/Account"
import Login from "../../../components/ui/Login/Login"
import AccountNavBar from "../AccountNavBar/AccountNavBar"

import { fetchData, isLogin } from "../../../fuctions"
import styles from "./NavBar.module.css"


function NavBar(props) {
    const [changeNavbar, setChangeNavbar] = useState(false)
    const { data:logoData } = useQuery({ 
            queryKey : ['gets_logo'],
            queryFn : () => fetchData("/api/home/1/logo/")
    });

    function changeNav() {
        if (window.scrollY >= 5) {
            setChangeNavbar(true)
        } else {
            setChangeNavbar(false)
        }
    }
    window.addEventListener('scroll', changeNav)
    
    return <div className={`${styles.navbar} ${changeNavbar && styles.changeNavbar}`}>
        <div className={styles.left}>
            <a href="/">
                <img src={logoData?.image} className={styles.logo}/>
            </a>
            <Search />
        </div>
        <div className={styles.right}>
            <Account
                title="Liên hệ" 
                description="038697785" 
                icon={faPhone}
            />
            { isLogin()
                ? <AccountNavBar/>
                : <div className={styles.login}>
                    <Login/>
                </div>
            }
        </div>
    </div>
}
export default NavBar