import styles from "./WaitingSpin.module.css"


export default function WaitingSpin(props) {
    const backgroundColor = props.backgroundColor;
    const color = props.color;
    const time = props.time;
    const style = {
        "--backgroundColor": backgroundColor,
        "--color": color,
        "--time": time,
    }
    return <div className={styles.waitingSpin} style={style}>
        <section className={styles.waitingBox}>
            <p><span></span></p>
        </section>
    </div>
}