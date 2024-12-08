import Stars from "../Stars/Starts";
import styles from "./Comment.module.css"


export default function Comment(props) {
    const comment = props.comment;
    const name = comment.user.full_name;
    const title = comment.user.level.name;
    const avatarUrl = comment.user.avatar;
    const content = comment.content;
    const stars = 3;
    const avatarWidth = props.avatarWidth;

    return <div className={styles.comment}>
            <div 
                className={styles.avatar}
                style = {{width: avatarWidth}}
            >
                <img src={avatarUrl} alt="" />
            </div>
            <div className={styles.content}>
                <p className={styles.title}>({title})</p>
                <h1>{name}</h1>
                {/* <Stars num={stars}/> */}
                <p>{content}</p>
            </div>
        </div>
}