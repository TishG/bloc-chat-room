import React, { Component } from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
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
  render() {
    return (
      <main className="App">
        <RoomList firebase={firebase} />
      </main>
    );
  }
}

export default App;
