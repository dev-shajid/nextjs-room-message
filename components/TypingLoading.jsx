import React from 'react'
import styles from '../styles/Home.module.css'

const TypingLoading = ({name}) => {
  return (
    <div className={styles.chat_message}>
        <div className={styles.chat_profile}>
            {name.split('')[0].toUpperCase()}
        </div>
        <div className={styles.chat_info}>
            <div className={styles.user_name}>{name}</div>
            <div className={styles.chat_text_wrapper}>
                <div className={styles.chat_typing}>
                    <div className={styles.chat_typing_dot}></div>
                    <div className={styles.chat_typing_dot}></div>
                    <div className={styles.chat_typing_dot}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TypingLoading