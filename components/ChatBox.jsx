import { IconButton } from '@mui/material'
import { Send } from '@mui/icons-material'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useAuth } from '../context'
import { useEffect } from 'react'
import ChatMessages from './ChatMessages'
import { useRef } from 'react'
import TypingLoading from './TypingLoading'

const ChatBox = ({ socket, changedRoom, alertMessage }) => {
    const { name, room } = useAuth()
    const [message, setMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState()
    const [messages, setMessages] = useState([])
    const [typingUsers, setTypingUsers] = useState([])
    const chatElement = useRef(null)
    const sound = new Audio('./notification.mp3')
    const inputElement = useRef(null)

    const scrollToBottom = (t=10) => {
        setTimeout(() => {
            chatElement.current.scrollTo({
                top: chatElement.current.scrollHeight,
                behavior: 'smooth'
            })
        }, t)
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(message.trim()){
            setMessage('')
            socket.emit("sendMessage", { name, room: changedRoom, message });
        }
        // inputElement.current.blur()
        socket.emit('typing', {name, room: changedRoom, typing:false})
    }

    const handleChange=(e)=>{
        setMessage(e.target.value)
        if(e.target.value.trim()){
            socket.emit('typing', {name, room: changedRoom, typing:true})
        }
        if(!e.target.value.trim()){
            socket.emit('typing', {name, room: changedRoom, typing:false})
        }
    }

    const handleFocus=()=>{
        message.trim() && socket.emit('typing', {name, room: changedRoom, typing:true})
    }

    const handleBlur=()=>{
        socket.emit('typing', {name, room: changedRoom, typing:false})
    }

    useEffect(() => {
        if (socket) {
            socket.on("getMessage", (data) => {
                setArrivalMessage(data)
                scrollToBottom()
            })

            socket.on('typing',({name, typing})=>{
                typing?setTypingUsers([...typingUsers, name]):setTypingUsers(typingUsers.filter(e=>e!=name))
                scrollToBottom()
            })

            socket.on('notification', () => sound.play())
        }
    }, [socket])

    useEffect(() => {
        if (arrivalMessage?.message) {
            setMessages([...messages, arrivalMessage])
        }

    }, [arrivalMessage])

    useEffect(() => {
        if (alertMessage?.message) {
            setMessages([...messages, alertMessage])
        }
        scrollToBottom()
    }, [alertMessage])

    useEffect(() => {
        setMessages([])
        setMessage('')
        setTypingUsers([])
    }, [changedRoom])

    return (
        <>
            <div className={styles.chat_room}>
                {changedRoom}
            </div>
            <div ref={chatElement} className={styles.chat_messages}>
                {
                    messages[0] && <ChatMessages messages={messages} name={name} />
                }
                {
                    typingUsers[0] && typingUsers.map((e,i)=>(
                        <div key={i}>
                            <TypingLoading name={e}/>
                        </div>
                    ))
                }
            </div>

            <form onSubmit={handleSubmit} className={styles.chat_input_box}>
                <input ref={inputElement} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} value={message} type='text' placeholder='Type something...' />
                <IconButton
                    disabled={message.trim() ? false : true}
                    sx={{ width: 'auto' }}
                    type='submit'
                >
                    <Send />
                </IconButton>
            </form>
        </>
    )
}

export default ChatBox