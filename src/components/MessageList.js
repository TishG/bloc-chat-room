import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.state = {
        messages: [],
      };
    }

    componentDidMount() {
      this.messagesRef.on("child_added", snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        console.log(snapshot.key)
        this.setState({ messages: this.state.messages.concat( message ) })
      });
    }
//Associate messages with a room

    render() {
      return (
        <main className="message-room">
        <h2>{this.props.activeRoom ? this.props.activeRoom.name : " " }</h2>
          <ul className="message-list">
            {
              this.state.messages.map( (message, index) =>
                { return ( <li
                        key={index}
                        className="message">
                        {message.roomId === room.key ? message.content: " "}:{message.roomId}
                       </li>
                     )
                })
            }
          </ul>
        </main>
      );
    }
}

export default MessageList;
