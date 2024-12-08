import { useMutation } from "@tanstack/react-query";
import CommentInput from "../../../components/ui/CommentInput/CommentInput";
import { postData } from "../../../fuctions";

import styles from "./ReplyInputForm.module.css"


export default function ReplyInputForm(props) {
    const url = props.url;
    const commentId = props.commentId;
    const refetch = props.refetch;

    const {mutate: replySubmit, isSuccess, reset} = useMutation({
        mutationFn: (data) => postData(url, data)
    })

    function handleReplySubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let formValues = Object.fromEntries(formData);

        formValues.comment = commentId;
        replySubmit(formValues);
    }

    if (isSuccess) {
        refetch();
        reset();
    }

    return <div className={styles.replyInputForm}>
        <CommentInput onSubmit={handleReplySubmit} avatarWidth="40px"/>
    </div>
}