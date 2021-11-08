import React, {useEffect, useState} from 'react';
import "./Sidebar.css";
import SidebarChat from '../SidebarChat/SidebarChat';

import {Avatar, IconButton} from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import db from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Sidebar() {
    const [rooms, setRooms] = useState([]);

    /* Cuando se cargue el componente obtenemos los datos de chat de Firebase. */
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            })));
        });

        return () => {
            unsubscribe();
        }
        
    }, []);

    console.log(rooms);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar />

                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Busca o comienza un chat nuevo"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {
                    rooms.map((room) => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))
                }
            </div>
        </div>
    )
}
