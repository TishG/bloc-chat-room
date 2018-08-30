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
        if (!this.props.activeRoom || !newContent) { return }
        this.messagesRef.push({
          content: newContent,
          username: this.props.user ? this.props.user.displayName : " Guest",
          roomId: this.props.activeRoom.key,
          sentAt: Date.now()
        });
        this.setState({ newContent: " " })
    }

    handleMessage(input) {
      this.setState({ newContent: input });
    }

    render() {
      return (
        <main className="message-room">
        <h2>{this.props.activeRoom ? this.props.activeRoom.name : " "}</h2>

          <ul className="message-list">
            {
              this.state.messages.map( (message, index) =>
                { return (
                        <li
                        key={index}
                        className="user-messages">
                        <p>
                          { this.props.user ? this.props.user.displayName : " Guest" }
                        </p>
                          {message.roomId === this.props.activeRoom.key ? message.content: " " }
                       </li>
                     )
                })
            }
          </ul>
          <section
          className="new-message-form">
             <input type="text"
             value={this.state.newContent}
             onChange={(e) => this.handleMessage(e.target.value)}/>
             <input
             type="button"
             value="Send"
             onClick={(e) => this.createMessage(e, this.state.newContent)}/>
           </section>
        </main>
      );
    }
}

export default MessageList;
