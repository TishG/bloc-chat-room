import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
      super(props);
      this.messagesRef = this.props.firebase.database().ref("messages");
      this.state = {
        messages: [],
        newContent: " "
      };
    }

    componentDidMount() {
      this.messagesRef.on("child_added", snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat( message ) })
      });
    }

    createMessage(e, newContent) {
        e.preventDefault();
        if(newContent === " ") { return };
        if (!this.props.activeRoom || !newContent) { return };
        this.messagesRef.push({
          content: newContent,
          username: this.props.user ? this.props.user.displayName : " Guest",
          roomId: this.props.activeRoom.key,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        }).orderByChild("sentAt");
        this.setState({ newContent: " "})
    }

    handleMessage(input) {
      this.setState({ newContent: input });
    }

    deleteMessage(message, activeRoom) {
      return this.props.firebase.database().ref('messages').child(message).remove();
      window.location.reload(true);
    }

    logUsername(user, message) {
      if( message.roomId === this.props.activeRoom.key && this.props.user ) {
        return this.props.user.displayName ;
      } else if ( message.roomId === this.props.activeRoom.key && !this.props.user ) {
        return " Guest" ;
      }
    }

    render() {
      return (
        <main className="message-room">
        <h2 className="active-room">{this.props.activeRoom ? this.props.activeRoom.name : " "}</h2>

          <ul className="message-list">
            {
              this.state.messages.map( (message, index) =>
                { return (
                        <li
                        key={index}
                        className="user-messages">
                        <p>
                          <span>{ this.logUsername(this.props.user, message) }</span>
                        </p>
                        <p>
                          {message.roomId === this.props.activeRoom.key ? message.content: " " }
                          { message.roomId === this.props.activeRoom.key ?
                            <button
                            className="delete-message"
                            onClick={() => this.deleteMessage(message.key)}>delete</button> : " " }
                        </p>
                       </li>
                     )
                })
            }
          </ul>
          <section
          className="new-message-form">
             <input
             className="message-input"
             type="text"
             value={this.state.newContent}
             onChange={(e) => this.handleMessage(e.target.value)}/>
             <input
             className="output-message"
             type="button"
             value="Send"
             onClick={(e) => this.createMessage(e, this.state.newContent)}/>
           </section>
        </main>
      );
    }
}

export default MessageList;
