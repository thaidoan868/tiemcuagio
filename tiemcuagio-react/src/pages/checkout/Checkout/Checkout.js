import { useMutation } from "@tanstack/react-query"

import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs"
import CheckoutCart from "../CheckoutCart/CheckoutCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import Success from "../Success/Success"
import QrPayment from "../QrPayment/QrPayment"

import { postData } from "../../../fuctions"
import styles from "./Checkout.module.css"


export default function Checkout(props) {
    document.title = "Tạo đơn - Tiệm của Gió"
    const { data: order, mutate: createOrder, isSuccess } = useMutation({
        mutationKey: ["create_order"],
        mutationFn: (data) => postData('/api/orders/list_create/', data, false)
    });

    function handleOnSubmit(data) {
        createOrder(data);
    }

    function checkoutRender() {
        if (isSuccess) {
            if (order.payment_method === "cod") {
                return <div className={styles.checkoutContainer}>
                        <div className={styles.success}>
                            <Success detail_url={order.detail_url}/>
                        </div>
                        <div className={styles.carts}>
                            <CheckoutCart/>
                        </div>
                    </div> 
            }
            else if (order.payment_method === "credit_card") {
                return <div className={styles.qrPayment}>
                    <QrPayment detailUrl={order.detail_url}/>
                </div>
            }
        }
       return <div className={styles.checkoutContainer}>
            <div className={styles.checkoutForm}>
                    <CheckoutForm onSubmit={handleOnSubmit}/>
            </div>
            <div className={styles.carts}>
                <CheckoutCart/>
            </div>
        </div> 
    }

    return <div className={styles.checkout}>
        <Breadcrumbs breads={['Giỏ hàng', 'Tạo đơn']}/>
        { checkoutRender() }
    </div>
}