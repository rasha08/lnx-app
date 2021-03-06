import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
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
    auth.signInWithPopup(googleAuthProvider).then(
      this.setState({
        currentUser: auth.currentUser
      })
    );
  }
  signout() {
    auth.signOut();
  }
  sendMessage(message) {
    if (message) {
      this.messagesRef.push({
        text: message,
        user: this.state.currentUser.displayName,
        date: new Date()
      });
    } else {
      return;
    }
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.signin);
    window.removeEventListener('click', this.signout);
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
          <Link to="/recipes">
            <button className="btn waves-effect waves-light right recipes-btn">
              RECIPES
              <i className="material-icons right">queue</i>
            </button>
          </Link>
          <Link to="/">
            <button className="btn waves-effect waves-light right home-btn">
              HOME
              <i className="material-icons right">chat</i>
            </button>
          </Link>
        </div>
      );
    } else if (!this.state.messages && this.state.currentUser) {
      return (
        <div className="container col s12">
          <div className="progress black">
            <div className="indeterminate red" />
          </div>
          <NewMessage sendMessage={this.sendMessage} />
          <button className="btn waves-effect waves-light right logout" onClick={this.signout}>
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
        <button className="btn waves-effect waves-light" onClick={this.signin}>
          LOGIN
          <i className="material-icons right">person</i>
        </button>
      </div>
    );
  }
}

export default Messenger;
