import styles from "./ProductInfo.module.css"


export default function ProductInfo(props) {
    const product = props.product;
    const ingredients = product.ingredients;
    const weight = product.weight;
    const size = product.size;
    const category = product.category; 
    return <div className={styles.productInfo}>
        <h1>Thông tin sản phẩm</h1>
        <table>
            <tbody>
                <tr>
                    <td>Thể loại</td>
                    <td>{category}</td>
                </tr>
                <tr>
                    <td>Nguyên liệu</td>
                    <td>{ingredients}</td>
                </tr>
                <tr>
                    <td>Cân nặng</td>
                    <td>{weight} (gram)</td>
                </tr>
                <tr>
                    <td>Kích thước</td>
                    <td>{size}</td>
                </tr>
            </tbody>
        </table>
    </div>
}