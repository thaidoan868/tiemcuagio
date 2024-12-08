import { useEffect, useState } from "react";
import styles from "./Slider.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../../fuctions";


export function Slider(props) {
    let imageUrls = [];
    const { data, isLoading, isError } = useQuery({
        queryKey: ["slider"],
        queryFn: () => fetchData("/api/home/2/slider/")
    });
    const [imageIndex, setImageIndex] = useState(0) ;


    function setNextImage() {
        setImageIndex(index => {
            if (index === imageUrls.length - 2) return 0;
            return index + 1;
        })
    }
    
    function setPrevImage() {
        setImageIndex(index => {
            if (index === 0) return imageUrls.length - 2;
            return index-1;
        })
    }
    
    function changeSlider() {
        setNextImage()
        setTimeout(changeSlider, 3000)
    }


    // useEffect(changeSlider, [])
    if (isLoading || isError){
        return <div className={styles.loading}>
            <p></p>
            <p></p>
        </div>
    }

    data.images.map(value => imageUrls.push(value.image));

    return <div className={styles.slider}>
        <button className={styles.left} onClick={setPrevImage}>
            <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        <button className={styles.right} onClick={setNextImage}>
            <FontAwesomeIcon icon={faChevronRight}/>
        </button>
        <div className={styles.slide}> {
            imageUrls.map((value, i) => 
                <img 
                    src={value} 
                    style={{translate: `${-104*imageIndex}%`}}
                    key={i}
                />
            )
        } </div>
        <p> {
            imageUrls.map((value, index) => (
                index !== imageUrls.length-1 &&
                <button key={index} onClick={() => setImageIndex(index)}>{
                    index === imageIndex ? <FontAwesomeIcon icon={faXmark} className={styles.clickedIcon}/> 
                                         : <FontAwesomeIcon icon={faMinus} className={styles.unclickedIcon}/>
                }</button>
            ))
        } </p> 
   </div>
}       
