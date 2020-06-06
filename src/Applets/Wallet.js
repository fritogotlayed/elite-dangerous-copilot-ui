import React, { useState } from 'react';
import './Wallet.css';

const Wallet = ({ socket, className }) => {
  let [state, setState] = useState({ balance: 'N/A', recentTransactions: [], nextKey: 1 });

  socket.once('walletData', (data) => {
    const standardizedData = typeof data === 'string' ? JSON.parse(data) : data;
    const sortedData = [].concat(standardizedData.log)
      .sort((a, b) => a.ts < b.ts ? 1 : -1);
    const newLog = sortedData // _.slice(sortedData, 0, maxTransactions);
    const newState = {
      balance: standardizedData.balance,
      recentTransactions: newLog
    };
    setState(newState);
  });

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

  let body;
  if (state.recentTransactions.length > 0) {
    body = (
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