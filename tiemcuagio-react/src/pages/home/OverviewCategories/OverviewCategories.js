import { useQuery } from "@tanstack/react-query"
import { Overview } from "../../../components/ui/Overview/Overview"
import { fetchData } from "../../../fuctions"
import styles from "./OverviewCategories.module.css"

export function OverviewCategories(props) {
    const {data} = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetchData("/api/products/category/")
    })
    if (data) return <div className={styles.overviewCategories}> {
            data.map((category, i) => 
                <div key={i}>
                    <Overview 
                        url={category.detail_url} 
                    />
                </div>
            )
    } </div>
}