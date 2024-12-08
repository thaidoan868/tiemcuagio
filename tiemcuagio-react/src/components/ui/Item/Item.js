import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

import ReviewProduct from "../ReviewProduct/ReviewProduct";
import { numberWithCommas} from "../../../fuctions";
import styles from "./Item.module.css"


export function Item(props) {
    const product = props.product;
    const id = product.id;
    let name = product.name;
    let price = numberWithCommas(product.price);
    let imageUrls = product.images.map(image => image.image);

    const [showQuickReview, setShowQuickReview] = useState(false) 

    function stopEvent(e) {
        e.stopPropagation()
    }

    return <div className={styles.item}>
        <div className={styles.imageContainer}>
            <a href={"/products/"+id}> <img loading="lazy" src={imageUrls[0]} alt="" /> </a>
        </div>
        <div className={styles.content}>
            <p className={styles.name}><a href={"/products/"+id}>{name}</a></p>
            <p className={styles.price}>{price}₫</p>
            <hr/>
            <button className={styles.quickReviewButton} onClick={() => setShowQuickReview(true)}>
                <p>XEM NHANH</p>
                <span className={styles.iconContainer}>
                    <FontAwesomeIcon icon={faChevronRight}/>
                </span>
            </button>
        </div>
{/* ----------------------------------------------- */}
{/* ----------------------------------------------- */}
        { showQuickReview &&
            <div 
                className={styles.quickReviewContainer}
                onClick={()=> setShowQuickReview(false)}
            >
                <div className={styles.quickReview} onClick={stopEvent}>
                    <ReviewProduct product={product} showLink={true}/>
                    <button className={styles.close} onClick={() => setShowQuickReview(false)}>
                            <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
            </div>
        }
    </div>
}