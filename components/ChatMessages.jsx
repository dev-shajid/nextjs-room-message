import React from 'react'
import styles from '../styles/Home.module.css'

const ChatMessages = ({messages, name}) => {
  return (
    messages.map((m, i) => (
        m.type=='message' ? 
        <div className={name!=m.name?styles.chat_message:`${styles.chat_message} ${styles.chat_own_message}`} key={i}>
            <div className={styles.chat_profile}>
                {m.name.split('')[0].toUpperCase()}
            </div>
            <div className={styles.chat_info}>
                <div className={styles.user_name}>{m.name}</div>
                <div className={styles.chat_text_wrapper}>
                    <div className={styles.chat_text}>{m.message}</div>
                </div>
            </div>
        </div>
        :
        <div className={styles.alert_message} key={i*5555}>
            {m.message}
        </div>
    ))
  )
}

export default ChatMessages