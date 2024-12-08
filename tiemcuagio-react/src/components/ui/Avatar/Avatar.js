import styles from "./Avatar.module.css"
import React from "react";


export function Avatar(props) {
    let level = props.level;
    let avatarImage = props.avatarImage
    let avatarWidth = props.avatarWidth;
    let avatarFrame = props.avatarFrame;
    let levelClass;
    switch (level) {
        case 1:
            levelClass = `${styles.level1} ${styles.hasFrame}`
            break;

        case 2:
            levelClass = `${styles.level2} ${styles.hasFrame}`
            break;
    
        case 3:
            levelClass = `${styles.level3} ${styles.hasFrame}`
            break;
    
        case 4:
            levelClass = `${styles.level4} ${styles.hasFrame}`
            break;

        default:
            levelClass = styles.level0
            level = 0;
            break;
    }
    const style = { "--avatarWidth": avatarWidth };
    return <div 
            className={`${styles.avatar} ${levelClass}`}
            style={style}
        >
        {
            level>0 && <img className={styles.frame} src={avatarFrame}/>
        }
        <img src={avatarImage} className={styles.image} alt="" />
    </div>
}