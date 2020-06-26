import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './JumpLog.css';

const JumpLog = ({ socket, opts, className }) => {
  let [state, setState] = useState({ jumps: [] });
  const maxJumpsToShow = 10;

  socket.once('jumpLog', (data) => {
    const standardizedData = typeof data === 'string' ? JSON.parse(data) : data;
    const sortedData = [].concat(standardizedData)
      .sort((a, b) => a.ts < b.ts ? 1 : -1);
    const newLog = _.slice(sortedData, 0, maxJumpsToShow);
    setState(s => _.merge({}, s, { jumps: newLog }));
  });

  useEffect(() => {
    if (opts.bypassConfigure) {
      const requestOpts = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      };
      fetch(`${opts.baseUrl}/api/data/jumps`, requestOpts)
        .then((resp) => resp.json())
        .then((body) => {
          setState(s => _.merge({}, s, {
            jumps: body
          }))
        });
    }
  }, [opts]);

  return (<div className={className}>
    <h2>Jumps</h2>
    <ol className="jumpList">
         {state.jumps.map((e) => (<li key={e.ts + e.location}>{e.location}</li>))}
    </ol>
  </div>);
};

export default JumpLog;
