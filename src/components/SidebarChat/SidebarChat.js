import React, {useEffect, useState} from 'react';
import './SidebarChat.css';

import {Avatar} from "@mui/material"

export default function SidebarChat({addNewChat}) {

    /* Numero aleatorio que modifica la imagen de perfil. */
    const [seed, setSeed] = useState("");

    /* Cada vez que se cargue el componente se genera el número aleatorio que modifica el seed. */
    useEffect(() => {
        let randomNumber = Math.floor(Math.random() * 10000);
        setSeed(randomNumber);
    }, []);

    const createChat = () => {
        const roomName = prompt("Introduce un nombre para el chat.");

        if (roomName) {
            
        }
    };

    return !addNewChat ? (
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className="sidebarChat__info">
                <h2> Nombre de chat </h2>
                <p> Ultimo mensaje...</p>
            </div>
        </div>
    ) : (
        <div 
            className="sidebarChat"
            onClick={createChat}
        >
            <h2> Empieza una conversación </h2>
        
        </div>
    )
}
