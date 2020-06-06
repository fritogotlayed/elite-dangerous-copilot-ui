import React, { useState } from 'react';
import './App.css';
import socketIO from 'socket.io-client';

import Configure from './Applets/Configure';
import JumpLog from './Applets/JumpLog';
import ExternalLinks from './Applets/ExternalLinks';
import MissionLog from './Applets/MissionLog';
import Wallet from './Applets/Wallet';

function App() {
  const [source, setSource] = useState();

  const computeUserSource = (inputSource) => {
    return `http://${inputSource}:8888`;
  };

  const configSuccess = (source) => {
    const standardizedSource = computeUserSource(source);
    setSource(standardizedSource)
  };

  let body;
  if (source) {
    const socket = socketIO(source);
    body = (<div>
      <div className="columns">
        <JumpLog socket={socket} className="column" />
        <Wallet socket={socket} className="column" />
        <ExternalLinks className="column" />
      </div>
      <div className="columns">
        <MissionLog socket={socket} className="column" />
      </div>
    </div>);
  } else {
    body = (<Configure onConfigureSuccess={configSuccess} />);
  }
  return (
    <div className="content app">
      <h1>Elite Dangerous Co-Pilot</h1>
      {body}
    </div>
  );
}

export default App;
