import { useMutation } from "@tanstack/react-query";
import PaymentMethodInput from "../PaymentMethodInput/PaymentMethodInput"
import styles from "./ChangePaymentMethod.module.css"
import { patchData } from "../../../fuctions";


export default function ChangePaymentMethod(props) {
    const url = props.url;
    const refetch = props.refetch;
    
    const { mutate: changePaymentMethod, isSuccess, reset} = useMutation({
        mutationKey: [url],
        mutationFn: (data) => patchData(url, data)
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        changePaymentMethod(formData);
    }

    if (isSuccess) {
        refetch();
        reset();
    }

    return <div className={styles.changePaymentMethod}>
        <form onSubmit={handleOnSubmit}>
            <p>Đơn hàng chưa được thanh toán, thay đổi phương thức thanh toán để đặt lại đơn</p>
            <PaymentMethodInput/>
            <button>Đặt lại đơn</button>
        </form>
    </div>
}