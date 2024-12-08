import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

import styles from "./AvatarInput.module.css"


export default function AvatarInput(props) {
    const [image, setImage] = useState(props.image)

    function imageHandler(e) {
        const render = new FileReader();
        render.onload = () => {
            if (render.readyState) {
                setImage(render.result)
            }
        }
        render.readAsDataURL(e.target.files[0])
    } 
    return <div className={styles.avatarInput}>
                <div className={styles.outline}>
                    <label htmlFor="accountAvatar">
                        <span className={styles.uploadIcon}>
                            <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                        </span>
                        <img src={image} alt="" />
                    </label>
                </div>
                <input 
                    className={styles.uploadImage}
                    type="file" 
                    id="accountAvatar" 
                    name="avatar"
                    onChange={imageHandler}
                />
    </div>
}