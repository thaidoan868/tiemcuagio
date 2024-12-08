import { useQuery } from "@tanstack/react-query"

import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton"
import ImageSkeleton from "../../../components/ui/ImageSkeleton/ImageSkeleton"
import { Item } from "../../../components/ui/Item/Item"
import { fetchData } from "../../../fuctions"
import styles from "./RelatedProducts.module.css"

export default function RelatedProducts(props) {
    const category = props.category;
    const url = `/api/products/category/${category}/retreive/`
    const { data, isLoading, isError } = useQuery({
        queryKey: ["related_product"],
        queryFn: () => fetchData(url)
    });


    if (isLoading || isError) return <div className={styles.loading}>
        <div className={styles.itemsContainer}>
            <TextSkeleton lines={1} width="10%" fontSize="30px"/>
            <div className={styles.itemsFlexContainer}>
            {[...Array(5)].map((_,i) => 
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



    let products = data.products;

    return <div className={styles.relatedProducts}>
            <h1>Sản phẩm tương tự</h1>
            <div className={styles.itemsFlexContainer}>
                {products.map((product,i) => 
                    i <= 4 && <Item
                        product = {product}
                        key={i}
                    />
                )}
            </div>
    </div>
}