import * as React from 'react';
import { ListItemAvatar, Avatar, ListItemText, Divider, ListItem, List } from '@mui/material';
import styles from '../styles/Home.module.css'

export default function ActiveUser({ activeUsers }) {
    return (
        <>
            <div className={styles.chat_title}>Online User</div>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {
                    activeUsers?.map((user, index) => (
                        <div key={index}>
                            <ListItem alignItems="center">
                                <ListItemAvatar>
                                    <Avatar alt={user.name} src='#' />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                />
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }
            </List>
        </>
    );
}
