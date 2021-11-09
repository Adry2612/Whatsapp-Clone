import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { collection, addDoc, onSnapshot, query, orderBy, docs } from "firebase/firestore";

import './SidebarChat.css';

import db from "../../firebase";
import {Avatar} from "@mui/material";

export default function SidebarChat({  id, name, addNewChat }) {

    /* Numero aleatorio que modifica la imagen de perfil. */
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(async () => {
        if (id){
            const a = await query(collection(db,"rooms", id, "messages"), orderBy("timestamp", "desc"))
            const messageCollection = onSnapshot(a, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => (
                    doc.data()
                )));
            });
        }
    }, [id])
    /* Cada vez que se cargue el componente se genera el número aleatorio que modifica el seed. */
    useEffect(() => {
        let randomNumber = Math.floor(Math.random() * 10000);
        setSeed(randomNumber);
    }, []);

    const createChat = async () => {
        const roomName = prompt("Introduce un nombre para el chat.");

        /* Añadir nuevo chat a Firebase. */
        if (roomName) {
            /* A addDoc le pasamos la referencia al documento (collection(db, "nombre de documento"), {valores a añadir}). */
            await addDoc(collection(db, "rooms"), {name: roomName});
        }
    };
    
    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="sidebarChat__info">
                    <h2> {name} </h2>
                    <p> {messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div 
            className="sidebarChat"
            onClick={createChat}
        >
            <h2> Empieza una conversación </h2>
        
        </div>
    )
}
