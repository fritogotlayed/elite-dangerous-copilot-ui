import React from 'react';
import './ExternalLinks.css';

const ExternalLinks = ({ className }) => (
  <div className={`externalLinks ${className}`}>
    <h2>Links</h2>
    <ul>
      <li><a href="https://edsm.net/" target="_blank" rel="noopener noreferrer">EDSM</a></li>
      <li><a href="https://eddb.io/" target="_blank" rel="noopener noreferrer">EDDB</a></li>
      <li><a href="https://edtools.ddns.net/res.php" target="_blank" rel="noopener noreferrer">RES Locator</a></li>
      <li><a href="https://inara.cz/" target="_blank" rel="noopener noreferrer">INARA</a></li>
      <li><a href="https://edsy.org/" target="_blank" rel="noopener noreferrer">EDSY</a></li>
      <li><a href="https://coriolis.io/" target="_blank" rel="noopener noreferrer">Coriolis</a></li>
      <li><a href="https://elitedangerous.hozbase.co.uk/" target="_blank" rel="noopener noreferrer">ED Utilities</a></li>
      <li><a href="http://edtools.ddns.net/miner" target="_blank" rel="noopener noreferrer">Miner Tool</a></li>
      <li>
        <a href="https://elite-dangerous.fandom.com/wiki/Elite_Dangerous_Wiki" target="_blank" rel="noopener noreferrer">Wiki</a>
        <ul>
          <li><a href="https://elite-dangerous.fandom.com/wiki/Third_Party_Tools" target="_blank" rel="noopener noreferrer">Tools</a></li>
        </ul>
      </li>
    </ul>
  </div>
);

export default ExternalLinks;