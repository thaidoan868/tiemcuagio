import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs"
import CartItem from "../CartItem/CartItem"
import TotalPayment from "../TotalPayment/TotalPayment"
import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton"
import ImageSkeleton from "../../../components/ui/ImageSkeleton/ImageSkeleton"

import { fetchData } from "../../../fuctions"
import styles from "./Cart.module.css"

export default function Cart(props) {
    document.title = "Giỏ hàng - Tiệm của Gió"
    const {data: carts, refetch, isLoading, isError} = useQuery({
        queryKey: ["get_carts"],
        queryFn: () => fetchData("/api/carts/list_create_increase/")
    });

    if (isLoading || isError) return <div className={styles.loading}>
        <TextSkeleton lines={1} fontSize="3em" width="10%"/>
        <div className={styles.body}>
            <div className={styles.items}>
                {[...Array(3)].map((_,i) =>
                    <div className={styles.item} key={i}>
                        <div className={styles.image}>
                            <ImageSkeleton/>
                        </div>
                        <TextSkeleton lines={2} width="50%" fontSize="1.5em"/>
                        <TextSkeleton lines={1} width="15%" fontSize="1.5em"/>
                        <TextSkeleton lines={1} width="10%" fontSize="1.5em"/>
                    </div>
                )}
            </div>
            <div className={styles.totalBill}>
                <TextSkeleton lines={1} fontSize="2em" width="35%"/>
                <TextSkeleton lines={4} width="70%" marginBottom="1em"/>
                <TextSkeleton lines={1} fontSize="1.5em" width="20%"/>
                <div className={styles.bottom}>
                    <TextSkeleton lines={1} fontSize="3em"/>
                </div>
            </div>
        </div>
    </div>

    return <div className={styles.cart}>
        <Breadcrumbs breads={["Giỏ hàng"]}/>
        <div className={styles.cartContainer}>
            <h1>Giỏ hàng</h1>
            <div className={styles.flexContainer}>
                <div className={styles.items}>
                    {carts.map((cart,i) => 
                        <CartItem cart={cart} key={i + Math.random()} refetch={refetch}/>
                    )}
                </div>
                <TotalPayment carts={carts} showCreateOrder={true}/>
            </div>
        </div>
    </div>
}