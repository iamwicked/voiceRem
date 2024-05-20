'use client';
import styles from '../app/support/support.module.css'
export default function Review(props: any) {
    return (
        <>
            <li className={styles.reviewItem}>
                <img src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Images.png" alt="" className={styles.photo} />
                <div className={styles.name}>{props.name}</div>
                <div className={styles.date}>{props.date}</div>
                <div className={styles.message}>{props.message}</div>
            </li>
        </>
    )
}