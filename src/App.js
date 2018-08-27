import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
import './App.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBaPgaIErVHSt0V9_fuJoMePAkKjdHTkDY",
  authDomain: "bloc-chat-room-417a1.firebaseapp.com",
  databaseURL: "https://bloc-chat-room-417a1.firebaseio.com",
  projectId: "bloc-chat-room-417a1",
  storageBucket: "bloc-chat-room-417a1.appspot.com",
  messagingSenderId: "582110705605"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {},
      user: {},
      displayName: " "
    }
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room })
  }

  setUser(username) {
    this.setState({ user: username })
  }

  render() {
    return (
      <main className="App">
        <header>
        <User
        firebase={firebase}
        setUser={(username) => this.setUser(username)}
        />
          <h1 className="bloc-chat-title">Bloc Chat Room</h1>
        </header>
        <RoomList
        firebase={firebase}
        setActiveRoom={(room) => this.setActiveRoom(room)}
        />
        <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom}
        />
      </main>
    );
  }
}

export default App;
