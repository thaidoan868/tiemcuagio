import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../fuctions"

import ProductDetails from "../ProductDetails/ProductDetails"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import Comments from "../Comments/Comments"
import Breadcrumbs from "../../../components/ui/Breadcrumbs/Breadcrumbs"
import ProductInfo from "../ProductInfo/ProductInfo"
import ProductDocs from "../ProductDocs/ProductDocs"
import styles from "./Product.module.css"
import { useParams } from "react-router-dom"


export default function Product(props) {
    document.title = "Sản phẩm - Tiệm của Gió"
    const { id } = useParams()
    const url = `/api/products/${id}/`;
    const { data:product, isLoading, isError } = useQuery({
        queryKey: ["get_product_(*&#($*", id],
        queryFn: () => fetchData(url)
    });


    if (isLoading || isError){
        return <div>
            <Breadcrumbs loading={true}/>
            <ProductDetails loading={true}/>
        </div>
    }

    return <div className={styles.product}>
        <Breadcrumbs breads={[product.category, product.name]}/>
        <div className={styles.flexContainer}>
            <ProductDetails product={product}/>
            <RelatedProducts category={product.category}/>
            <ProductInfo product={product}/>
            <ProductDocs product={product}/>
            <Comments productId={product.id}/>
        </div>
    </div>
}