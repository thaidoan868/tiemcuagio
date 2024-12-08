import { useMutation } from "@tanstack/react-query";

import CommentInput from "../../../components/ui/CommentInput/CommentInput";
import { postData } from "../../../fuctions";
import styles from "./CommentInputForm.module.css"


export default function CommentInputForm(props) {
    const refetch = props.refetch;
    const url = props.url;
    const productId = props.productId;
    const rawUrl = props.rawUrl;


    const {mutate: commentSubmit, isSuccess, reset} = useMutation({
        mutationFn: (data) => postData(url, data, rawUrl)
    })

    function handleCommentSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        let formValues = Object.fromEntries(formData);

        formValues.product = productId;
        commentSubmit(formValues);
    }

    if (isSuccess) {
        refetch();
        reset();
    }
    
    return <div className={styles.commentInput}>
        <CommentInput onSubmit={handleCommentSubmit}/>
    </div>
}