import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: " ",

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
                        </li>
                      )
                })
          }
          </ul>
          <div
          className="new-room-form">
             <input type="text"
             value={this.state.newRoomName}
             onChange={(e) => this.handleChange(e.target.value)}/>
             <input
             type="button"
             value="Add Room"
             onClick={(e) => this.createRoom(this.state.newRoomName)}/>
           </div>
      </main>
    );
  }
}

export default RoomList;
