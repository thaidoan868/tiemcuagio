import { numberWithCommas } from "../../../fuctions";
import styles from "./CheckoutCartItem.module.css"


export default function CheckoutCartItem(props ) {
    const cart = props.cart;


    const image = cart.product_detail.images[0].image;
    const name = cart.product_detail.name;
    const price = cart.product_detail.price;
    const quantity = cart.quantity;


    return <div className={styles.checkoutCartItem}>
        <p className={styles.image}>
            <img src={image} alt="" />
            <span> {quantity} </span>
        </p>
        <p className={styles.name}> {name} <br/> <br/> ({numberWithCommas(price)}₫) </p>
        <p className={styles.price}>{numberWithCommas(price*quantity)}₫</p>
    </div>
}