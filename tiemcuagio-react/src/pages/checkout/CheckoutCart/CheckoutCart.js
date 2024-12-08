import { useQuery } from "@tanstack/react-query";

import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton";
import ImageSkeleton from "../../../components/ui/ImageSkeleton/ImageSkeleton";
import CheckoutCartItem from "../CheckoutCartItem/CheckoutCartItem"
import { fetchData } from "../../../fuctions";
import TotalPayment from "../../cart/TotalPayment/TotalPayment";
import styles from "./CheckoutCart.module.css"
import { useEffect } from "react";


export default function CheckoutCart(props) {
    const {data: carts, isLoading, isError, refetch} = useQuery({
        queryKey: ["get_carts_checkout"],
        queryFn: () => fetchData("/api/carts/list_create_increase/"),
        enabled: false
    });

    useEffect(()=> {refetch()}, []);


    if (isLoading || isError) return <div className={styles.loading}>
        {[...Array(3)].map((_,i) => 
            <div className={styles.item} key={i}>
                <div className={styles.image}> <ImageSkeleton/> </div>
                <TextSkeleton lines={2} width="60%"/>
                <TextSkeleton lines={1} width="10%" fontSize="1.5em"/>
            </div>
        )}
        <div className={styles.loadingTotalPayment}>
            {[...Array(3)].map((_,i) => 
                <div className={styles.item} key={i}>
                    <TextSkeleton lines={1} width="60%"/>
                    <p></p>
                    <TextSkeleton lines={1} width="10%" fontSize="1.5em"/>
                </div>
            )}
        </div>
    </div>
    if (carts) return <div className={styles.checkoutCart}>
        {
            carts.map((cart, i) => 
                cart.chosen && <CheckoutCartItem cart={cart} key={i}/>
            )
        }
        <dir className={styles.totalPayment}>
            <TotalPayment carts={carts}/>
        </dir>
    </div>
}