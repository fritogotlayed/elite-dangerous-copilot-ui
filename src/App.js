import _ from 'lodash';
import React, { useState } from 'react';
import './App.css';
import socketIO from 'socket.io-client';

import Configure from './Applets/Configure';
import JumpLog from './Applets/JumpLog';
import ExternalLinks from './Applets/ExternalLinks';
import MissionLog from './Applets/MissionLog';
import Wallet from './Applets/Wallet';

function App() {
  const [state, setState] = useState({ baseUrl: undefined });

  const computeUserSource = (inputSource) => {
    return `http://${inputSource}:8888`;
  };

  const configSuccess = (opts) => {
    console.log(opts);
    const standardizedSource = computeUserSource(window.location.hostname);
    setState(s => _.merge({}, s, { baseUrl: standardizedSource, opts}));
  };

  let body;
  if (state.baseUrl) {
    const socket = socketIO(state.baseUrl);
    const opts = {
      baseUrl: state.baseUrl,
      ...state.opts,
    };
    body = (<div>
      <div className="columns">
        <JumpLog socket={socket} opts={opts} className="column" />
        <Wallet socket={socket} opts={opts} className="column" />
        <ExternalLinks className="column" />
      </div>
      <div className="columns">
        <MissionLog socket={socket} opts={opts} className="column" />
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
