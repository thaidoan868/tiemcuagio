import styles from "./Notification.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export function Notification(props) {
    let number = props.number;
    let icon = props.icon;
    let color = props.color;

    return <div className={styles.notification}>
            <FontAwesomeIcon icon={icon} style ={{color: color}}/>
            {number > 0 && <p> {number} </p>}
    </div>
}