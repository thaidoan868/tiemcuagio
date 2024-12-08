import { useQuery } from "@tanstack/react-query";

import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton"
import ImageSkeleton from "../../../components/ui/ImageSkeleton/ImageSkeleton"
import Comment from "../../../components/ui/Comment/Comment";
import Replies from "../Replies/Replies";
import CommentInputForm from "../../../components/ui/CommentInputForm/CommentInputForm";
import Login from "../../../components/ui/Login/Login";

import { fetchData, isLogin } from "../../../fuctions";
import styles from "./Comments.module.css"

export default function Comments(props) {
    const productId = props.productId;
    const url = `/api/comments/list_create/?product_pk=${productId}`;
    const {refetch, data:comments, isLoading, isError} = useQuery({
        queryKey: ["comments"],
        queryFn: () => fetchData(url)
    });

    if (isLoading || isError) return <div className={styles.loading}>
        <div className={styles.comment}>
            <div className={styles.avatar}><ImageSkeleton/></div>
            <TextSkeleton lines={1} fontSize="4em" width="30%"/>
        </div>
        <div className={styles.comment}>
            <div className={styles.avatar}><ImageSkeleton/></div>
            <TextSkeleton lines={1} fontSize="3em" width="20%"/>
        </div>
        <div className={styles.comment}>
            <div className={styles.avatar}><ImageSkeleton/></div>
            <TextSkeleton lines={1} fontSize="3em" width="20%"/>
        </div>
        <div className={styles.comment}>
            <div className={styles.avatar}><ImageSkeleton/></div>
            <TextSkeleton lines={1} fontSize="5em" width="40%"/>
        </div>
    </div>


    return <div className={styles.comments}>
        <h1>Đánh giá sản phẩm</h1>
        { isLogin()
            ? <CommentInputForm 
                refetch={refetch} 
                url={url}
                productId={productId}
                rawUrl={false}
            />
            : <div className={styles.login}>
                <p>Đăng nhập để viết bình luận</p>
                <Login/>
            </div>

        }
        { comments.map((comment, index) =>
                <div className={styles.comment} key={index}>
                    <Comment 
                        avatarWidth="50px" 
                        comment={comment} 
                    />
                    <div className={styles.replies}>
                        <Replies 
                            url={comment.reply_list_create_url} 
                            commentId={comment.id}
                        />
                    </div>
                </div>
        ) }
    </div>
}