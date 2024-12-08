import parse from "html-react-parser"
import styles from "./ProductDocs.module.css"


export default function ProductDocs(props) {
    const product = props.product;
    const docs = product.description;
    return <div className={styles.productDocs}>
        <h1 className={styles.header}>Mô tả sản phẩm</h1>
        {parse(docs)}
    </div>
}