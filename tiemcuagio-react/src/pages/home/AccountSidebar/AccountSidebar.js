import styles from "./AccountSidebar.module.css"
import parse from "html-react-parser";
import TextSkeleton from "../../../components/ui/TextSkeleten/TextSkeleton";
import { ImageSkeleton } from "../../../components/ui/ImageSkeleton/ImageSkeleton";
import { fetchData,numberWithCommas } from "../../../fuctions";
import { useQuery } from "@tanstack/react-query";


function getLevelClass(level) {
    switch(level) {
        case 1:
            return `${styles.level1} ${styles.hasAvatarFrame}`
        case 2:
            return `${styles.level2} ${styles.hasAvatarFrame}`
        case 3:
            return `${styles.level3} ${styles.hasAvatarFrame}`
        case 4:
            return `${styles.level4} ${styles.hasAvatarFrame}`
        default:
            return `${styles.level0}`
    }
    
}


function AccountSidebar(props) {
    const {data, isLoading, isError} = useQuery({
        queryKey : ["AccountSidebar"],
        queryFn: () => fetchData("/api/user/retrieve_update/")
    });

    if (isLoading || isError) {
        return <div className={styles.loading}>
            <div className={styles.loadingAvatar}>
                <ImageSkeleton/>
            </div>
            <TextSkeleton lines={2} width="60%" lastPMargin="auto"/>
            <TextSkeleton lines={3} width="65%" lastPMargin="auto"/>
        </div> 
    }
            
    const level = data.level
    const levelClass = getLevelClass(level.level);
    return <div 
                className={`${styles.account_sidebar} ${levelClass}`}
                style = {level.level >= 2 ? {borderImageSource : `url('${level.outline_frame}')`}: {}}
            >
        <div className={styles.avatar}>
            {level.level >= 1 && <img src={level.detail_avatar_frame} className={styles.avatarFrame} alt="" />}
            <img src={data.avatar} className={styles.image}/>
        </div>
        <p className={styles.name}>
            {data.full_name}
        </p>
        <p className={styles.levelTitle}>
            {parse(level.displayed_name)}
        </p>
        <div className={styles.infomation}>
            <p>Đã mua: <span className={styles.price}>{numberWithCommas(data.purchased_amount)}đ</span></p>
            <p> Đơn đang xử lý: <span className={styles.orders}>{data.processing_orders}</span></p>
            <p> Số dư: {numberWithCommas(data.account_balance)}₫</p>
        </div>
    </div>
}

export default AccountSidebar;