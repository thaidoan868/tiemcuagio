import { useQuery } from "@tanstack/react-query";
import Comment from "../../../components/ui/Comment/Comment";
import { fetchData, isLogin } from "../../../fuctions";
import styles from "./Replies.module.css"
import ReplyInputForm from "../../../components/ui/ReplyInputForm/ReplyInputForm";


export default function Replies(props) {
    const url = props.url;
    const commentId = props.commentId;

    const {data: replies, refetch} = useQuery({
        queryKey: [url],
        queryFn: () => fetchData(url, true)
    });


    if (replies) return <div className={styles.replies}>
        {replies.map((reply, index) =>
            <div className={styles.reply} key={index}>
                <Comment avatarWidth="40px" comment={reply}/>
            </div>
        )}
        { isLogin() &&
            <ReplyInputForm 
                url={url} 
                refetch={refetch} 
                commentId={commentId}
                rawUrl={true}
            />
        }
    </div>

    return <div></div>
}