import styles from "./TextSkeleton.module.css"


export default function TextSkeleton(props) {
    let lines = props.lines;
    let width = props.width;
    let lastPMargin = props.lastPMargin
    let fontSize = props.fontSize
    let marginBottom = props.marginBottom;


    return <div 
                className={styles.textSkeleton}
                style = {{
                            "width": width,
                            "--lastPMargin": lastPMargin,
                            "fontSize": fontSize,
                        }}
            >
        {
            lines === 1 ?  <p style={{width: "100%"}}></p>:
            [...Array(lines)].map((_,i)=> 
                <p key={i} style={{marginBottom: marginBottom}}></p>
            )
        }
    </div>
}