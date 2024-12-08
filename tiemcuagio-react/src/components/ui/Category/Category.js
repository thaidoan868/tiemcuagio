import styles from "./Category.module.css"
import { useLottie } from "lottie-react"


export function Category(props) {
    let json = props.json;
    let description = props.description;

    const style = {
        width: "100%",
    };
    const options = {
        animationData: json,
        loop: true,
        autoplay: true,
    };
    const { View } = useLottie(options, style);

    return <div className={styles.category}>
        <div className={styles.icon}>{View}</div>
        <p>{description}</p>
    </div>
}