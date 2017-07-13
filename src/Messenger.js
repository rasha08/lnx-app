import React, { Component } from 'react';
import { database, auth, googleAuthProvider } from './firebase';
import map from 'lodash/map';
import SingleMessage from './SingleMessage';
import NewMessage from './NewMessage';

class Messenger extends Component {
  constructor(props) {
    super();

    this.state = {
      currentUser: auth.currentUser,
      messages: null
    };
    this.messagesRef = database.ref('/messages');
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({ currentUser });

      this.messagesRef.orderByChild('text').on('value', snapshot => {
        this.setState({
          messages: snapshot.val()
        });
      });
    });
  }
  signin() {
    auth.signInWithPopup(googleAuthProvider);
    this.setState({
      currentUser: auth.currentUser
    });
  }
  signout() {
    auth.signOut();
  }
  sendMessage(message) {
    if (message) {
      this.messagesRef.push({
        text: message,
        user: this.state.currentUser.displayName
      });
    } else {
      return;
    }
  }

  render() {
    if (this.state.messages && this.state.currentUser) {
      return (
        <div className="container col s12">
          {map(this.state.messages, message => <SingleMessage message={message} key={message.date} />)}
          <NewMessage sendMessage={this.sendMessage} />
          <button
            className="btn waves-effect waves-light right logout"
            onClick={() => {
              this.signout();
            }}
          >
            LOGOUT
            <i className="material-icons right">person</i>
          </button>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="progress black">
          <div className="indeterminate red" />
        </div>
        <button
          className="btn waves-effect waves-light"
          onClick={() => {
            this.signin();
          }}
        >
          LOGIN
          <i className="material-icons right">person</i>
        </button>
      </div>
    );
  }
}

export default Messenger;
