import React from 'react';
import './App.css';
import socketIO from 'socket.io-client';

import JumpLog from './JumpLog';
import ExternalLinks from './ExternalLinks'

function App() {
  const socket = socketIO('http://192.168.5.101:8888');
  return (
    <div className="container">
      <h1>Elite Dangerous Co-Pilot</h1>
      <div className="row">
        <JumpLog socket={socket} className="col-4" />
        <ExternalLinks className="col-4" />
      </div>
    </div>
  );
}

export default App;
