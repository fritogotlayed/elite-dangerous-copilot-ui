import _ from 'lodash';
import React, { useState } from 'react';
import './Configure.css';

function Configure({ className, onConfigureSuccess }) {
  const [state, setState] = useState({
    showLogDirHelp: false,
  });

  const buttonClickHandler = () => {
    const endpoint = window.location.hostname;
    const directory = state.source || localStorage.getItem('logDirectory');

    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ directory }),
    };
    fetch(`http://${endpoint}:8888/api/watch`, opts)
      .then((resp) => resp.json())
      .then((body) => {
        if (state.source) localStorage.setItem('logDirectory', state.source);
        onConfigureSuccess(endpoint);
      });
  };

  let modal;
  if (state.showLogDirHelp) {
    modal = (
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content is-wide">
          <div className="box">
            <div className="section">
              Path to the elite dangerous logs directory on the system co-pilot is running on. This directory will usually contain some files named as such:
              <ul>
                <li>Journal.[number].[number].log</li>
                <li>Cargo.json</li>
                <li>Market.json</li>
                <li>Outfitting.json</li>
                <li>Status.json</li>
              </ul>
            </div>
            <div className="section">
              Example Paths:
              <ul>
                <li>Windows - C:\Users\Me\Saved Games\Frontier Developments\Elite Dangerous</li>
                <li>Linux (Proton)
                  <ul>
                    <li>Generally in the format of &lt;base&gt;/&lt;prefix&gt;</li>
                    <li>
                      Base 1 - /home/me/.local/share/Steam/steamapps/compatdata/359320/pfx
                    </li>
                    <li>
                      Base 2 - /home/me/.steam/steam/steamapps/compatdata/359320/pfx
                    </li>
                    <li>
                      Prefix - drive_c/users/steamuser/Saved Games/Frontier Developments/Elite Dangerous
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setState(_.merge({}, state, { showLogDirHelp: !state.showLogDirHelp }))}></button>
      </div>
    )
  }

  return (<div className={className}>
    {modal}

    <div className="field is-horizontal">
      <div className="field-label">
        <label className="label">ED Log Directory</label>
      </div>
      <div className="field-body">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              defaultValue={localStorage.getItem('logDirectory')}
              placeholder='C:\Users\Me\Saved Games\Frontier Developments\Elite Dangerous'
              onChange={(event) => setState(_.merge({}, state, { source: event.target.value}))}
            />
          </div>
          <div className="control">
            <button type="button" className="button is-info" onClick={() => setState(_.merge({}, state, { showLogDirHelp: !state.showLogDirHelp }))}>?</button>
          </div>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-label">{/* empty for spacing */}</div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <button type="button" className="button is-dark" onClick={() => buttonClickHandler() }>Set</button>
          </div>
        </div>
      </div>
    </div>

  </div>);
}

export default Configure;