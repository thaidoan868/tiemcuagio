import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styles from "./SearchOrder.module.css"



export default function SearchOrder(props) {
    const retrieveOrder = props.retrieveOrder;
    function handleOnSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        retrieveOrder(formData.get("id"));
    }
    return <div className={styles.searchOrder}>
        <h1>Tra cứu đơn hàng</h1>
        <form onSubmit={handleOnSubmit}>
            <input type="text" name="id" placeholder="Nhập mã đơn hàng"/>
            <button><FontAwesomeIcon icon={faSearch}/></button>
        </form>
    </div>
}