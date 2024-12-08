import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTruckFast,faFileCircleCheck, faGift } from "@fortawesome/free-solid-svg-icons"

import ImageSkeleton from "../../../components/ui/ImageSkeleton/ImageSkeleton"
import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton"
import ReviewProduct from "../../../components/ui/ReviewProduct/ReviewProduct"
import styles from "./ProductDetails.module.css"

export default function ProductDetails(props) {
    const product = props.product;
    

    if (props.loading) return <div className={styles.loading}>
        <div className={styles.images}>
            <div className={styles.bigImage}>
                <ImageSkeleton/>
            </div>
            <div className={styles.smallImages}>
                <div className={styles.image}><ImageSkeleton/></div>
                <div className={styles.image}><ImageSkeleton/></div>
                <div className={styles.image}><ImageSkeleton/></div>
            </div>
        </div>
        <div className={styles.content}>
            <TextSkeleton lines={2} fontSize="3em" />
            <TextSkeleton lines={2} fontSize=".7em" width="30%" />
            <TextSkeleton lines={1} fontSize="2em" width="20%" />
            <div className={styles.buy}>
                <div className={styles.button}><ImageSkeleton/></div>
                <div className={styles.button}><ImageSkeleton/></div>
            </div>
        </div>
    </div>
// ----------------------------------
// ----------------------------------
    return <div className={styles.productDetails}>
        <div className={styles.reviewproduct}>
            <ReviewProduct product={product} showLink={false}/>
        </div>
        <div className={styles.brand}>
            <p>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faTruckFast}/>
                </span>
                Giao hàng nội thành
            </p>
            <p>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faFileCircleCheck}/>
                </span>
                Chứng nhận  sinh an toàn thực phẩm
            </p>
            <p>
                <span className={styles.icon}>
                    <FontAwesomeIcon icon={faGift}/>
                </span>
                Tích điểm đổi quà
            </p>
        </div>
    </div>
}