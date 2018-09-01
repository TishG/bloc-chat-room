import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: " "
    };
    // Store a Firebase reference to the rooms path onto the this keyword
    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      //use .concat() to add the snapshots actual data ( snapshot.val() ).
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(input) {
    this.setState({ newRoomName: input })
  }

  createRoom(room, e) {
    if(this.state.newRoomName.trim() === "") {
      return;
    }
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: " " })
  }

  deleteRoom(roomKey) {
    const room = this.props.firebase.database().ref("rooms/" + roomKey);
    const messages = this.props.firebase.database().ref("messages/" + roomKey);
    room.remove();
    messages.remove();
    window.location.reload(true);
  }

  render() {
    return (
      <main className="room">
      <h2>Rooms</h2>
        <ul
        className="room-list">
          {
            this.state.rooms.map( (room, index) =>
             {
               return ( <li
                         onClick={() => this.props.setActiveRoom(room)}
                         key={index}
                         className="room-name">
                          {room.name}
                          <button
                          className="delete-room"
                          type="button"
                          onClick={() => this.deleteRoom(room.key)}>delete</button>
                        </li>
                      )
                })
          }
          </ul>
          <section
          className="new-room-form">
             <input type="text"
             value={this.state.newRoomName}
             onChange={(e) => this.handleChange(e.target.value)}/>
             <input
             type="button"
             value="Add Room"
             onClick={(e) => this.createRoom(this.state.newRoomName)}/>
           </section>
      </main>
    );
  }
}

export default RoomList;
