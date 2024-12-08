import styles from "./Breadcrumbs.module.css"
import TextSkeleton from "../TextSkeleten/TextSkeleton";


export default function Breadcrumbs(props) {
    const breads = props.breads;

    if (props.loading) return <div className={styles.loading}>
        <TextSkeleton width="10%"/>
        <TextSkeleton width="10%"/>
        <TextSkeleton width="25%"/>
    </div>

    return <div className={styles.breadcrumbs}>
        <p>Trang chủ</p>
        {breads.map((bread, i) => 
            [
                <p key={i + Math.random()}>/</p>,
                <p key={i + Math.random()}>{bread}</p>
            ]
        )}
    </div>
}