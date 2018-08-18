import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    // Store a Firebase reference to the rooms path onto the this keyword
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      //use .concat() to add the snapshots actual data ( snapshot.val() ).
      //.concat() does not modify existing array.
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  render() {
     console.log(this.state.rooms);
    return (
      // Inside of the render method, use a .map() call on this.state.rooms to display data for each room.
      //Finally, if you haven't already done so, render the component from the App component.
      // checkpoint - List Chat Rooms
      <main className="room">
        <section
        className="room-list">
          {
            this.state.rooms.map( (room, index) =>
             {
               return ( <section
                         key={index}
                         className="room-name">
                          {room.name}
                        </section> )
                })
          }
          </section>
      </main>
    );
  }
}

export default RoomList;
