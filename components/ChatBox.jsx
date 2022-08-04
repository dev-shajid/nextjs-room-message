import { IconButton } from '@mui/material'
import { LogoDev, Send } from '@mui/icons-material'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useAuth } from '../context'
import { useEffect } from 'react'
import ChatMessages from './ChatMessages'
import { useRef } from 'react'

const ChatBox = ({ socket, changedRoom, alertMessage }) => {
    const { name, room } = useAuth()
    const [message, setMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState()
    const [messages, setMessages] = useState([])
    const chatElement = useRef(null)
    const sound = new Audio('./notification.mp3')

    const scrollToBottom = () => {
        setTimeout(()=>{
            chatElement.current.scrollTo({
                top:chatElement.current.scrollHeight,
                behavior:'smooth'
            })
        },10)
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        setMessage('')
        socket.emit("sendMessage", { name, room: changedRoom, message });
    }

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                setArrivalMessage(data)
                scrollToBottom()
            })

            socket.on('notification',()=>sound.play())
        }
    }, [socket])

    useEffect(() => {
        if(arrivalMessage?.message){
            setMessages([...messages, arrivalMessage])
        }

    }, [arrivalMessage])

    useEffect(() => {
        if(alertMessage?.message){
            setMessages([...messages, alertMessage])
        }
        scrollToBottom()
    }, [alertMessage])

    useEffect(()=>{
        setMessages([])
        // setArrivalMessage({})
    },[changedRoom])

    return (
        <>
            <div className={styles.chat_room}>
                {changedRoom}
            </div>
            <div ref={chatElement} className={styles.chat_messages}>
                {
                    messages[0] && <ChatMessages messages={messages} name={name}/>
                }
            </div>

            <form onSubmit={handleSubmit} className={styles.chat_input_box}>
                <input onChange={(e) => setMessage(e.target.value)} value={message} type='text' placeholder='Type something...' />
                <IconButton
                    disabled={message.trim() ? false : true}
                    sx={{ width: 'auto' }}
                // type='submit'
                >
                    <Send />
                </IconButton>
            </form>
        </>
    )
}

export default ChatBox