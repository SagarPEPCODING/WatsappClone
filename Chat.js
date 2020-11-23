import React, { useState, useEffect } from 'react';
import './chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './Stateprovider';
import firebase from 'firebase';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) =>
                setRoomName(snapshot.data().name)
            )
            db.collection("rooms").doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed this message :- " + input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    // ;


    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerinfo">
                    <h3>{roomName}</h3>
                    <p>{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString()}</p>

                </div>

                <div className="chat__headerRight">
                    {/* <IconButton> */}
                    <SearchIcon />
                    <AttachFileIcon />
                    <MoreVertIcon />
                </div>

            </div>

            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat_message ${message.name === user.displayName && "chat__reciever"}`}>
                        <span className="chat_name">{message.name} </span>
                        {message.message}
                        <span className="time__stamp">{new Date(message.timestamp?.toDate()).toLocaleTimeString()}</span>
                    </p>
                ))}


        </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
