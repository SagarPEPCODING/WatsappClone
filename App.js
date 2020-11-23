// import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import {useStateValue} from './Stateprovider';

function App() {

  const [{ user },dispatch] = useStateValue();

  return (
    // BEM naming convention
    <div className="app">
    {!user ? (
      <Login />
    ):(
      <div className="app__body">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    
    )}
    </div> 
  );
}

export default App;