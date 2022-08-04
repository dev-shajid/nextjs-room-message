import React from 'react';
import {List, ListItemButton, ListItemAvatar, Avatar, ListItemText} from '@mui/material';

const AbailableRooms = ({setChangedRoom, changedRoom}) => {

    const rooms = [
        {
            room : "JavaScript",
            img : '/JavaScript.png'
        },
        {
            room : "Python",
            img : '/Python.png'
        },
        {
            room : "PHP",
            img : '/PHP.png'
        },
    ]

    const handleListItemClick = ({room}) => {
        setChangedRoom(room)
    };

  return (
    <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {rooms.map((value, index)=>(
                <ListItemButton
                    onClick={() => handleListItemClick(value)}
                    selected={changedRoom == value.room}
                    key={index}
                >
                    <ListItemAvatar>
                        <Avatar alt={value.room} src={value.img} />
                    </ListItemAvatar>
                    <ListItemText primary={value.room} />
                </ListItemButton>
            ))}
        </List>
    </>
  )
}

export default AbailableRooms