import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './Wallet.css';

const sortWalletLog = (input) => [].concat(input).sort((a, b) => a.ts < b.ts ? 1 : -1);

const Wallet = ({ socket, opts, className }) => {
  let [state, setState] = useState({
    balance: 'N/A',
    recentTransactions: [],
    adjustment: '',
  });

  socket.once('walletData', (data) => {
    const standardizedData = typeof data === 'string' ? JSON.parse(data) : data;
    const sortedData = sortWalletLog(standardizedData.log);
    const newState = {
      balance: standardizedData.balance,
      recentTransactions: sortedData,
    };
    setState(newState);
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
      fetch(`${opts.baseUrl}/api/data/wallet`, requestOpts)
        .then((resp) => resp.json())
        .then((body) => {
          const sortedData = sortWalletLog(body.log);
          setState(s => _.merge({}, s, {
            balance: body.balance,
            recentTransactions: sortedData,
          }))
        });
    }
  }, [opts]);

  const formatCredits = (amount) => {
    const reverse = (input) => input.split('').reverse().join('');
    const temp = reverse(amount.toString(10));
    const sep = ',';
    let formatted = '';

    for (let i = 0; i < temp.length; i += 1) {
      if (i !== 0 && i % 3 === 0 ) formatted += sep;
      formatted += temp[i];
    }

    return reverse(formatted);
  };

  const submitAdjustment = () => {
    const endpoint = window.location.hostname;

    const opts = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ expectedAmount: state.adjustment }),
    };
    fetch(`http://${endpoint}:8888/api/walletAdjustment`, opts)
      .then((resp) => {
        if (resp.ok) setState(s => _.merge({}, s, { adjustment: '' }))
      });
  };

  let body;
  if (state.recentTransactions.length > 0) {
    body = (
    <div>
      <div className="table-container walletTableContainer">
        <table className="table is-striped is-narrow walletTable">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
          {state.recentTransactions.map((e) => (
            <tr key={e.type + e.ts}>
              <td className={e.type === 'credit' ? '' : 'debit'}>{e.type === 'credit' ? '' : '-'}{formatCredits(e.amount)}</td>
              <td>{e.note}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      <div className="field is-horizontal">
        <div className="field-label">
          <label className="label">Adjustment</label>
        </div>
        <div className="field-body">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input is-small adjustmentInput"
                type="text"
                placeholder='expected amount (ex): 500000'
                value={state.adjustment}
                onChange={(event) => {
                  const newValue = event.target.value;
                  setState(s => _.merge({}, s, { adjustment: newValue}));
                }}
                onKeyPress={(event) => event.key === 'Enter' && submitAdjustment()}
              />
            </div>
            <div className="control">
              <button type="button" className="button is-small is-info" onClick={() => submitAdjustment()}>
                <i class="fa fa-check" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>);
  } else {
    body = (<div>transactions not available</div>);
  }

  return (<div className={className}>
    <h2>Wallet ({formatCredits(state.balance)})</h2>
    {body}
  </div>);
};

export default Wallet;