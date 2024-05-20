'use client'
import styles from './support.module.css'
import Review from '../../components/review'
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

export default function Page() {
    const [addMessage, setAddMessage] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [reviews, setReviews] = useState<any[]>([]);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    function messageAdd(e: any) {
        setMessage(e.target.value);
        const button = document.querySelector(`.${styles.white}`);
        if(message.length>0){
            setButtonDisabled(false)
            button?.setAttribute("style","filter: brightness(100%);")
        }
        else{
            setButtonDisabled(true)
            button?.setAttribute("style","filter: brightness(75%);")
        }
    }
    useEffect(()=>{
        setReviews([...reviews, { name: "Tushar Talesara", date: "5/20/2024, 8:30:34 PM", message: "Hello" }]);
    },[])
    const messageUpload = () => {
        if (message.length > 0) {
            setReviews([...reviews, { name: "XYZ", date: new Date().toLocaleString(), message: message }]);
            setMessage("");
            setAddMessage(!addMessage);
        }
    }
    return (
        <>
            <main className={styles.supportPage}>
                <div className="add">
                    <div className={styles.wrapper}>
                        <button className={styles.btn} onClick={() => { setAddMessage(!addMessage) }}>
                            <MapsUgcIcon />
                            <p className={styles.add}>Add</p>
                        </button>
                    </div>
                </div>
                <ul className={styles.reviews}>
                    {
                        reviews.map((review, index) => <Review key={index} name={review.name} date={review.date} message={review.message} />)
                    }
                </ul>
            </main>
            {
                addMessage &&
                <div className={styles.modal}>
                    <button className={`${styles.cancel} ${styles.btn}`} onClick={() => { setAddMessage(!addMessage), setMessage('') }}>
                        <CloseIcon fontSize="large" />
                    </button>
                    <div className={styles.form}>
                        <h2 style={{ fontWeight: 500, fontSize: `calc(1.3rem + 1vw)` }}>Add Message</h2>
                        <textarea placeholder="ask your question or add a review" maxLength={1000} minLength={1} className={styles.txtarea} value={message} onChange={e=>messageAdd(e)}></textarea>
                        <div className={styles.buttons}>
                            <button className={`${styles.white} ${styles.btn}`} onClick={messageUpload} disabled={isButtonDisabled} style={{filter: `brightness(75%)`}}>Add</button>
                            <button className={`${styles.link} ${styles.btn}`} onClick={() => { setAddMessage(!addMessage), setMessage('')}}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}