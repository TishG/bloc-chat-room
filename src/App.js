import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
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
      activeRoom: {}
    }
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Bloc Chat Room</h1>
        </header>
        <RoomList
        firebase={firebase}
        setActiveRoom={(room) => this.setActiveRoom(room)}
        />
        <MessageList
        firebase={firebase}
        activeRoom={this.state.activeRoom} />
      </main>
    );
  }
}

export default App;
