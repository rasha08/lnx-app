import React, { Component } from 'react';

class NewMessage extends Component {
  constructor(props) {
    super();

    this.state = {
      message: '',
      props
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    this.state.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.sendMessage);
  }

  render() {
    return (
      <div className="container">
        <div className="row new-message">
          <div className="input-field col s9">
            <textarea
              placeholder="Mesto za poruku"
              onChange={event => {
                this.setState({ message: event.target.value });
              }}
              className="materialize-textarea"
            />
          </div>
          <div className="col s3">
            <button className="btn waves-effect waves-light" onClick={this.sendMessage}>
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewMessage;
