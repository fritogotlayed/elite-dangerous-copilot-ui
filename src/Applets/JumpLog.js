import _ from 'lodash';
import React, { useState } from 'react';
import './JumpLog.css';

const JumpLog = ({ socket, className }) => {
  let [jumpHistory, setJumps] = useState([]);
  const maxJumpsToShow = 10;

  socket.once('jumpLog', (data) => {
    const standardizedData = typeof data === 'string' ? JSON.parse(data) : data;
    const sortedData = [].concat(standardizedData)
      .sort((a, b) => a.ts < b.ts ? 1 : -1);
    const newLog = _.slice(sortedData, 0, maxJumpsToShow);
    setJumps(newLog);
  });

  return (<div className={className}>
    <h2>Jumps</h2>
    <ol className="jumpList">
         {jumpHistory.map((e) => (<li key={e.ts + e.location}>{e.location}</li>))}
    </ol>
  </div>);
};

export default JumpLog;
