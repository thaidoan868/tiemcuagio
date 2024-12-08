import styles from "./Categories.module.css"
import { Category } from "../../../components/ui/Category/Category"
import pastry from "./json/pastry.json"
import cake from "./json/hbbd_cake.json"
import bread from "./json/bread.json"
import others from "./json/others.json"
import paper from "./json/paper.json"
import ship from "./json/shipping.json"


export function Categories (props) {

    return <div className={styles.categories}>

        <Category json={cake} description="Bánh kem" />
        <Category json={pastry} description="Bánh lạnh"/>
        <Category  json={bread}  description="Bánh mì" />
        <Category  json={others}  description="Các loại bánh khác" />
        <Category  json={paper}  description="Tạo đơn theo yêu cầu" />
        <Category  json={ship}  description="Kiểm tra đơn hàng"/>
    </div>
}