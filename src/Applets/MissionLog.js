import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './MissionLog.css';

const MissionLog = ({ socket, opts, className }) => {
  const initialState = { missions: [] };
  const [state, setState] = useState(initialState);

  socket.once('missionLog', (data) => {
    const standardizedData = typeof data === 'string' ? JSON.parse(data) : data;
    const sortedData = [].concat(standardizedData)
      .sort((a, b) => a.name > b.name ? 1 : -1);
    setState({ missions: sortedData })
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
      fetch(`${opts.baseUrl}/api/data/missions`, requestOpts)
        .then((resp) => resp.json())
        .then((body) => {
          setState(s => _.merge({}, s, {
            missions: body
          }))
        });
    }
  }, [opts]);

  const computeDisplayData = (data) => {
    // TODO: Use regular sort, not lodash
    let displayData = []
    for (let i = 0; i < data.length; i += 1) {
      let elem = data[i];
      let section = _.find(displayData, (o) => o.header === elem.location);
      if (!section){
        section = { header: elem.location, items: [] };
        displayData.push(section);
      }
      section.items = [].concat([ elem, ...section.items])
        .sort((a, b) => a.name > b.name ? 1 : -1);
    }

    return displayData.sort((a, b) => a.header > b.header ? 1 : -1);
  }

  let body;
  // TODO: Group missions into locations
  if (state.missions.length > 0) {
    const displayData = computeDisplayData(state.missions);
    body = (
    <div className="columns">
      {displayData.map((section) => (
        <div className="column" key={section.header || 'Unknown'}>
          <h6>{section.header || 'Unknown'}</h6>
          <ol>
            {section.items.map((e) => (<li key={e.id}>{e.name}</li>))}
          </ol>
        </div>
      ))}
    </div>);
  } else {
    body = (<div>No active missions</div>);
  }

  return (<div className={className}>
    <h2>Missions</h2>
    {body}
  </div>);
};

export default MissionLog;
