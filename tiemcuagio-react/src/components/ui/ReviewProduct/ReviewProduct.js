import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { useRef } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import NumberInput from "../NumberInput/NumberInput";
import { isLogin, numberWithCommas, postData } from "../../../fuctions";
import styles from "./ReviewProduct.module.css"


export default function ReviewProduct(props) {
    const product = props.product;
    const showLink = props.showLink;
    let id = product.id;
    let name = product.name;
    let price = numberWithCommas(product.price);
    let imageUrls = product.images.map(image => image.image);
    let add_to_cart_url = product.add_to_cart_url;
    
    const { mutate:addToCart, isSuccess } = useMutation({
        mutationFn: (data) => postData(add_to_cart_url, data)
    });

    const [imageIndex, setImageIndex] = useState(0)
    const inputRef = useRef();
    
    function handleAddToCart() {
        const data = {
            "quantity": inputRef.current.value,
            "product": id
        }
        addToCart(data);
        inputRef.current.value = 1;
    }


    return <div className={styles.reviewProduct}>
                <div className={styles.reviewImages}>
                    <div className={styles.bigImage}>
                        <img loading="lazy" src={imageUrls[imageIndex]} alt=""/>
                    </div>
                    <div className={styles.smallImages}>{
                        imageUrls.map((url, index) =>
                            <button 
                                onClick={() => setImageIndex(index)}
                                className={index === imageIndex ? styles.clicked : undefined}
                                key={index}
                            >
                                <img loading="lazy" src={url}/>
                            </button>
                        )
                    }</div>
                </div>
                <div className={styles.reviewContent}>
                    <p className={styles.reviewName}>{name}</p>
                    <p className={styles.reviewId}>Mã sản phẩm: <span>{id}</span></p>
                    <p className={styles.reviewPrice}>{price}₫</p>
                    <NumberInput inputRef={inputRef}/>
                    { isSuccess && <p className={styles.addedToCart}>
                        <FontAwesomeIcon icon={faCircleCheck}/>
                        &emsp;Đã thêm vào giỏ hàng
                    </p> }
                    { isLogin() === false &&
                        <p className={styles.login}>
                            <span> <FontAwesomeIcon icon={faTriangleExclamation}/> </span>
                            &nbsp; Đăng nhập để thêm vào giỏ hàng
                        </p> 
                    }
                    <div className={styles.reviewBuy}>
                        <button className={styles.addToCart} onClick={handleAddToCart}>
                            <span> <FontAwesomeIcon icon={faCartPlus}/> </span>
                            &nbsp;THÊM VÀO GIỎ
                        </button>
                        <button className={styles.createOrder}>MUA NGAY</button>
                    </div>
                    { showLink && <a href={"/products/" + id + "/"}>{">>>"}Xem chi tiết sản phẩm</a> }
                </div>
            </div>
}