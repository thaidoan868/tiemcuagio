import styles from "./Overview.module.css";
import { Item } from "../Item/Item";
import TextSkeleton from "../TextSkeleten/TextSkeleton";
import { ImageSkeleton } from "../ImageSkeleton/ImageSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../fuctions";

export function Overview(props) {
    const url = props.url
    const {data, isLoading, isError} = useQuery({
        queryKey: [url],
        queryFn: () => fetchData(url, true)
    })
    if (isLoading || isError) return <div className={styles.loading}>
        <div className={styles.image}>
            <ImageSkeleton/>
        </div>
        <div className={styles.itemsContainer}>
            <TextSkeleton lines={1} width="10%" fontSize="30px"/>
            <div className={styles.itemsFlexContainer}>
            {[...Array(10)].map((_,i) => 
                    <div className={styles.itemContainer} key={i}>
                        <div className={styles.imageContainer}>
                            <ImageSkeleton/>
                        </div>
                        <TextSkeleton lines={2} width="80%"/>
                        <TextSkeleton lines={1} width="20%"/>
                        <div className={styles.quickReview}>
                            <TextSkeleton lines={1} width="50%" fontSize="30px"/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>


    let image = data.image;
    let name = data.name;
    let products = data.products;

    return <div className={styles.overview}>
        <img src={image} alt="" />
        <div className={styles.items_container}>
            <p className={styles.title}>{name}</p>
            <div className={styles.items_flex_container}>
                {products.map((product,i) => 
                    <Item
                        product = {product}
                        key={i}
                    />
                )}
            </div>
        </div>
    </div>
}