import styles from "./Ranks.module.css"
import { Avatar } from "../../../components/ui/Avatar/Avatar"
import { ImageSkeleton } from "../../../components/ui/ImageSkeleton/ImageSkeleton"
import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton"
import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../fuctions"



function Ranks(props) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["ranks"],
        queryFn: () => fetchData("/api/user/ranks/")
    });

    if (isLoading || isError) {
        return <div className={styles.loading}>
            <TextSkeleton lines={1} width="80%"/>
            {[...Array(3)].map((_,i) => 
                <div key={i} className={styles.rank}>
                    <div className={styles.loadingAvatar}><ImageSkeleton/></div>
                    <TextSkeleton lines={1} width="70%"/>
                </div>
            )}
        </div>
    }

    return <div className={styles.ranks}>
        <h1>✧˖° Xếp hạng khách hàng ✧˖°</h1>
        {data.map((rank, index) => (
            <div className={styles.rank} key={index}>
                <Avatar 
                    level={rank.level.level} 
                    avatarImage={rank.avatar}
                    avatarWidth={"35px"}
                    avatarFrame={rank.level.avatar_frame}
                />
                <p>{rank.full_name}</p>
            </div>
        ))}
    </div>
}
export default Ranks