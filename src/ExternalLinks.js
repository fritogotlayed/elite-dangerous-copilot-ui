import React from 'react';
import './ExternalLinks.css';

const ExternalLinks = ({ className }) => (
  <div className={`externalLinks ${className}`}>
    <h2>Links</h2>
    <ul>
      <li><a href="https://edsy.org/" target="_blank" rel="noopener noreferrer">Ship Yard</a></li>
      <li><a href="https://edsm.net/" target="_blank" rel="noopener noreferrer">Star Map</a></li>
      <li><a href="https://coriolis.io/" target="_blank" rel="noopener noreferrer">Ship Builds</a></li>
      <li><a href="https://eddb.io/" target="_blank" rel="noopener noreferrer">EDDB</a></li>
      <li><a href="https://elite-dangerous.fandom.com/wiki/Elite_Dangerous_Wiki" target="_blank" rel="noopener noreferrer">Wiki</a></li>
    </ul>
  </div>
);

export default ExternalLinks;