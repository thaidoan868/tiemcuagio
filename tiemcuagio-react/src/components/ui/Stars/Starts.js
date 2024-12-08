import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import styles from "./Starts.module.css"

export default function Stars(props) {
    const num = props.num;
    return <div className={styles.stars}>
        {[...Array(num)].map((_,i) => 
                <FontAwesomeIcon icon={faStar} key={i}/>
        )}
    </div>
    
}