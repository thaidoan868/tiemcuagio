import { useMutation } from "@tanstack/react-query";
import styles from "./CancellOrder.module.css"
import { postData } from "../../../fuctions";


export default function CancellOrder(props) {
    const url = props.url;
    const orderId = props.orderId;
    const refetch = props.refetch;
    const { mutate:cancellOrder, isSuccess, reset} = useMutation({
        mutationKey: [url],
        mutationFn: (data) => postData(url, data)
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        cancellOrder(formData)
    }

    if (isSuccess) {
        refetch();
        reset();
    }

    return <div className={styles.cancellOrder}>
        <p>Hủy đơn hàng</p>
        <form onSubmit={handleOnSubmit}>
            <div>
                <label htmlFor="cancellMessage">Lý do:</label>
                <textarea id="cancellMessage" name="message" placeholder="Không còn nhu cầu.."></textarea>
            </div>
            <input type="hidden" value={orderId} name="order"/>
            <button>Hủy đơn hàng</button>
        </form>
    </div>
}