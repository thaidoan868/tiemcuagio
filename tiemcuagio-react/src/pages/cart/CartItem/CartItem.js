import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react"
import { useMutation } from "@tanstack/react-query";

import NumberInput from "../../../components/ui/NumberInput/NumberInput"
import { numberWithCommas, patchData, deleteData } from "../../../fuctions";
import styles from "./CartItem.module.css"



export default function CartItem(props) {
    const cart = props.cart;
    const chosen = cart.chosen;
    const productId = cart.product_detail.id;
    const image = cart.product_detail.images[0].image;
    const name = cart.product_detail.name;
    const price = cart.product_detail.price;
    const quantity = cart.quantity;

    const edit_url = cart.edit_url;
    const refetchData = props.refetch;
    const quantityRef = useRef();

    const {mutate:changeChosen, isSuccess, reset} = useMutation({
        mutationKey: [edit_url],
        mutationFn: (data) => patchData(edit_url, data)
    });

    if (isSuccess) {
        refetchData();
        reset();
    }

    function handleChosen(e) {
        const data = {
            chosen: e.target.checked
        };
        changeChosen(data);
    }
// ----------------------------------------------------------------

    const {mutate:changeQuantity, isSuccess:successChangeQuantity, reset:quantityReset} = useMutation({
        mutationKey: [edit_url],
        mutationFn: (data) => patchData(edit_url, data)
    });

    if (successChangeQuantity) {
        refetchData();
        quantityReset();
    }

    function updateQuantity() {
        let quantity = quantityRef.current.value;
        if (quantity) {
            const data = {
                quantity: parseInt(quantity)
            }
            changeQuantity(data)
        }
    }
// ----------------------------------------------------------------

    const {mutate:deleteCart, isSuccess:successDeleteCart, reset:deleteReset} = useMutation({
        mutationKey: [edit_url],
        mutationFn: () => deleteData(edit_url)
    });

    if (successDeleteCart) {
        refetchData();
        deleteReset();
    }


    function handleDeleteCart() {
        deleteCart();
    }

    return <div className={styles.cartItem}>
        <input type="checkbox" defaultChecked={chosen} onChange={handleChosen}/>
        <img src={image} alt="" />
        <div className={styles.textContainer}>
            <a className={styles.name} href={"/products/"+productId}>{name}</a>
            <p className={styles.price}>{numberWithCommas(price)}₫</p>
            <div className={styles.numberInput}>
                <NumberInput 
                    inputRef={quantityRef} 
                    inputFontSize=".9em"
                    default={quantity}
                    onChange={updateQuantity}
                />
            </div>
            <button onClick={handleDeleteCart}>
                <FontAwesomeIcon icon={faXmark}/>
            </button>
        </div>
    </div>
}