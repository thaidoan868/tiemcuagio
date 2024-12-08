import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from "./Search.module.css"


function Search (props) {
    return <div className={styles.search}>
        <input type="text" placeholder="tiramisu..." />
        <button>
            <FontAwesomeIcon  icon={faMagnifyingGlass}/>
        </button>
    </div>
}
export default Search