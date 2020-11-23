import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './Sidebarchat.js';
import db from './firebase';
import {useStateValue} from './Stateprovider';

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user },dispatch] = useStateValue();

    useEffect(() => {
        const unsubcribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return () => {
            unsubcribe();
        };
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src = {user?.photoURL}/>
                <div className="sidebar__headerRight">
                    {/* <IconButton> */}
                    <DonutLargeIcon />
                    {/* </IconButton> */}

                    {/* <IconButton> */}
                    <ChatIcon />
                    {/* </IconButton> */}


                    {/* <IconButton> */}
                    <MoreVertIcon />
                    {/* </IconButton> */}


                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input placeholder="Search or start new chat..." type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <Sidebarchat addNewChat></Sidebarchat>
                {rooms.map(room => (
                    <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;