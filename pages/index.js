import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SocketIOClient from "socket.io-client";
import { useAuth } from '../context';
import { useRouter } from 'next/router'
import ChatLeft from '../components/AbailableRooms';
import ActiveUser from '../components/ActiveUser'
import Divider from '@mui/material/Divider';
import ChatBox from '../components/ChatBox';


export default function Home() {
  const { name, room, dispatch } = useAuth()
  const [changedRoom, setChangedRoom] = useState(room);
  const [activeUsers, setActiceUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const router = useRouter()

  useEffect(() => {
    if (!name || !room) {
      router.push('/login')
    }
  }, []);

  useEffect(() => {
    if (name && room) {
      const newSocket = SocketIOClient.connect(`https://nextjs-message-server.herokuapp.com`);
      setSocket(newSocket);
      return () => newSocket.close();
    } else {
      router.push("/login")
    }
  }, [name, changedRoom]);

  useEffect(() => {
    if (name && changedRoom && socket) {
      // connect to socket server

      // log socket connection
      socket.on("connect", (data) => {
        // setSocketId(socket.id)
      });

      // welcome message send to the new user only
      socket.on('welcome', ({ name, room }) => {
        setAlertMessage({
          message: `Hello ${name} , Welcome to ${room} room.`,
          type: 'alert',
        })
      })

      // send messsage of joining the new user to others member
      socket.on('newUserJoined', ({ name, room }) => {
        setAlertMessage({
          message: `${name} has joined to ${room} room.`,
          type: 'alert',
        })
      })

      // send leveing message of a user to others member
      socket.on('userHasLeft', ({ name, room }) => {
        setAlertMessage({
          message: `${name} has left from ${room} room.`,
          type: 'alert',
        })
      })

      // Add User when user came
      socket.emit('adduser', { name, room: changedRoom })

      // Active Users
      socket.on('activeUsers', (users) => {
        setActiceUsers(users)
      })

      // Remove Users from active when disconnect
      if (socket) return () => {
        socket.disconnect()
        // setConnected(false)
      };
    }

  }, [name, socket, changedRoom])

  if (!name || !room) <></>
  else {
    return (
      <div className={styles.container}>

        <Head>
          <title>Group Chat</title>
        </Head>
        <h1 className={styles.title}>Group Chat</h1>
        <div className={styles.wrapper}>
          <div className={styles.chat_box}>
            <div className={styles.chat_box_left}>
              {/* List of rooms */}
              <div className={styles.chat_title}>Available Rooms</div>
              <ChatLeft setChangedRoom={setChangedRoom} changedRoom={changedRoom} />
            </div>

            <Divider orientation="vertical" flexItem />

            <div className={styles.chat_box_middle}>
              {/* Show all chats message */}
              <ChatBox socket={socket} changedRoom={changedRoom} alertMessage={alertMessage} />
            </div>

            <Divider orientation="vertical" flexItem />

            <div className={styles.chat_box_right}>
              {/* Show the list of active users */}
              <ActiveUser activeUsers={activeUsers} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
