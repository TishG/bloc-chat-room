import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    // Store a Firebase reference to the rooms path onto the this keyword
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.state = {
      rooms: [],
      newRoomName: " "
    };
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      //use .concat() to add the snapshots actual data ( snapshot.val() ).
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }

  createRoom(room) {
    this.roomsRef.push({ name: this.state.newRoomName });
  }

  render() {
    return (
      <main className="room">
        <ul
        className="room-list">
          {
            this.state.rooms.map( (room, index) =>
             {
               return ( <li
                         key={index}
                         className="room-name">
                          {room.name}
                        </li>
                      )
                })
          }
          </ul>
          <form
          className="new-room-form"
          onSubmit={(e) => this.createRoom(e)}>
             <input type="text"
             value={this.state.newRoomName}
             onChange={(e) => this.handleChange(e)}/>
             <button
             type="submit"
             onSubmit={(e) => this.createRoom}>Add Room</button>
           </form>
      </main>
    );
  }
}

export default RoomList;
