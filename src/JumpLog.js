import _ from 'lodash';
import React, { useState } from 'react';
import './JumpLog.css';

const JumpLog = ({ socket, className }) => {
  let [jumpHistory, setJumps] = useState([]);
  const jumpsHandle = -1;
  const maxJumpsToShow = 10;

  socket.on('Location', (data) => {
    const event = JSON.parse(data);
    jumpHistory = _.slice([ { loc: event.StarSystem, ts: event.timestamp }, ...jumpHistory ], 0, maxJumpsToShow);
    // jumpHistory = [ { loc: event.StarSystem, ts: event.timestamp } ];
    if (jumpsHandle !== -1) clearTimeout(jumpsHandle);
    setTimeout(() => setJumps(jumpHistory), 500);
    console.log(`From Location (After): ${JSON.stringify(jumpHistory)}`);
  });
  socket.on('FSDJump', (data) => {
    const event = JSON.parse(data);
    jumpHistory = _.slice([ { loc: event.StarSystem, ts: event.timestamp }, ...jumpHistory ], 0, maxJumpsToShow);
    if (jumpsHandle !== -1) clearTimeout(jumpsHandle);
    setTimeout(() => setJumps(jumpHistory), 500);
    console.log(`From FSDJump (After): ${JSON.stringify(jumpHistory)}`);
  })

  return (<div className={className}>
    <h2>Jumps</h2>
    <ol className="jumpList">
         {jumpHistory.map((e) => (<li key={e.ts + e.loc}>{e.loc}</li>))}
    </ol>
  </div>);
};

export default JumpLog;
