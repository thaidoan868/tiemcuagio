import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Account.module.css"


function Account(props) {
    const title = props.title;
    const description = props.description;
    const avatar = props.avatar;
    const icon = props.icon;
    const link = props.link;
    const descriptionOnClick = props.descriptionOnClick;


    return <div className={styles.account}>
        <a href={link}>
            {avatar ? <img src={avatar} /> 
                    : <FontAwesomeIcon className={styles.icon} icon={icon}/>}
        </a>
        <div className={styles.content}>
            <p className={styles.title}>
                <a href={link}> {title} </a>
            </p>
            <button 
                className={styles.description}
                onClick={descriptionOnClick}
            >
                {description}
            </button>
        </div>
    </div>
}
export default Account