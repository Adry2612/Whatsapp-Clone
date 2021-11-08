import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';

import db from '../../firebase';
import "./Chat.css";

import {Avatar, IconButton} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';

export default function Chat() {
    /* Numero aleatorio que modifica la imagen de perfil. */
    const [seed, setSeed] = useState("");
    /* Mensaje a enviar. */
    const [input, setInput] = useState("");

    const [roomName, setRoomName] = useState("");

    const { roomId } = useParams();

    /* Buscamos cambios en la id del chat para modificar los mensajes del chat. */
    useEffect(async () => {
        if (roomId) {
            const roomRef = doc(db, "rooms", roomId);
            const roomSnap = await getDoc(roomRef);
            setRoomName(roomSnap.data().name);
        }
    }, [roomId]);

    /* Cada vez que se cargue el componente se genera el número aleatorio que modifica el seed. */
    useEffect(() => {
        let randomNumber = Math.floor(Math.random() * 10000);
        setSeed(randomNumber);
    }, []);

    /* Enviar mensaje y eliminar del input. */
    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input);
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3> {roomName} </h3>
                    <p> Última conexión </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className="chat__message">
                    <span className="chat__name"> Adrián Vidal </span>
                    Holaaaaa estoy aqui haciendo cosas 
                    <span className="chat__timestamp">
                        10:34
                    </span>
                 </p>
                <p className="chat__message chat__receiver"> Holaaaaa </p>
             
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form action="">
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Escribe tu mensaje..." />
                    <button onClick={sendMessage} type="submit"> Enviar </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}
