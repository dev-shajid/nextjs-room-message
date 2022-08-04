import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { CircularProgress, Autocomplete, Button, TextField } from '@mui/material';
import styles from '../styles/Login.module.css'
import { useAuth } from '../context';
import { useRouter } from 'next/router'

const Login = () => {
    const [user, setUser] = useState({ name: '', room: '' })
    const [timer, setTimer] = useState()
    const [loading, setLoading] = useState(false)
    const { dispatch, name, room } = useAuth()
    const router = useRouter()

    const handleSubmit = () => {
        setLoading(true)
        clearTimeout(timer)

        setTimer(setTimeout(() => {
            dispatch({ type: 'ADD_USER', name: user.name, room: user.room })
            setLoading(false)
            router.push('/')
        }, 1000))
    }

    useEffect(() => {
        if (name && room) router.push('/')
    }, [])

    return (
        <>

            <Head>
                <title>Group Chat</title>
            </Head>
            <form className={styles.modal}>

                <h1 sx={{ m: '2rem auto' }}>Welcome</h1>

                <TextField
                    label='Enter Your Name'
                    sx={{
                        width: '95%',
                        m: '1rem auto'
                    }}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <Autocomplete
                    sx={{
                        width: '95% !important',
                        m: '1rem auto'
                    }}
                    disablePortal
                    onChange={(e) => setUser({ ...user, room: e.target.innerText })}
                    id="combo-box-demo"
                    options={Options}
                    renderInput={(params) => <TextField {...params} label="Enter Room" />}
                />

                {
                    !loading ?
                        <Button disabled={!user.name || !user.room ? true : false} onClick={handleSubmit} sx={{ width: '95%', m: '1rem auto', p: '10px !important' }} variant='contained'>Submit</Button> :
                        <Button sx={{ width: '95%', m: '1rem auto', p: '10px !important' }} variant='contained'><CircularProgress sx={{ color: 'white', mr: '1rem' }} size={25} />Loading...</Button>
                }
            </form>

        </>
    )
}

export default login

const Options = [
    { label: 'JavaScript' },
    { label: 'Python' },
    { label: 'PHP' },
]
