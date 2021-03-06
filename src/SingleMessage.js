import React from 'react';

const SingleMessage = props =>
  <div className="single-message col s12 row">
    <div className="col s9 message-text">
      {props.message.text}
    </div>
    <div className="col s2 message-user">
      {props.message.user}
    </div>
  </div>;

export default SingleMessage;
