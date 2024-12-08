import AccountSidebar from "../AccountSidebar/AccountSidebar";
import Ranks from "../Ranks/Ranks";
import { Slider } from "../Slider/Slider";
import { Categories } from "../Categories/Categories";
import { OverviewCategories } from "../OverviewCategories/OverviewCategories";
import Login from "../../../components/ui/Login/Login";
import { isLogin } from "../../../fuctions";

import styles from "./Home.module.css";


function Home(props) {
  document.title = "Tiệm của Gió"

  const sidebarStyle = isLogin() ? {position: "sticky"} : {};
  
  return <div className={styles.home}>
          <div className={styles.sidebar} style={sidebarStyle}>
            { isLogin()
                ? <AccountSidebar/>
                : <div className={styles.login}>
                  <p>Yêu cầu đăng nhập</p>
                    <Login/>
                </div>
            }
            <Ranks/>
          </div>
          <div className={styles.main}>
            <Slider/>
            <Categories />
            <OverviewCategories/>
          </div>
        </div>
}
export default Home