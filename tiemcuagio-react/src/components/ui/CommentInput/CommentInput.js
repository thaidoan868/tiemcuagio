import { useEffect, useRef, useState } from "react";
import styles from "./CommentInput.module.css"

export default function CommentInput(props) {
    const avatarWidth = props.avatarWidth;
    const handleSubmit = props.onSubmit;
    const [showButton, setShowButton] = useState(false)
    const inputRef = useRef();
    function autoresizing(e) {
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;

        e.target.value ? setShowButton(true) : setShowButton(false);
    }
    function handleOnsubmit(e) {
        handleSubmit(e);
        inputRef.current.value = "";
        setShowButton(false)
    }
    
    return <div className={styles.commentInput}>
            <div className={styles.avatar} style={{width:avatarWidth}}>
                <img src="/avatar.png" alt="" />
            </div>
            <form onSubmit={handleOnsubmit}>
                <textarea
                    ref={inputRef}
                    name="content" 
                    onChange={autoresizing} 
                    placeholder="Bánh rất ngon !">    
                </textarea>
                { showButton && <button id="comment_button">Gửi</button> }
            </form>
        </div>
}