import React from 'react';
import {indFormat} from '../utils/commonFunction';

function Header(props) {
  return (
    <div className="topbar">
      <div className="state-meta">
        <h1>{props.name}</h1>
        <p>Last Updated on {props.metaLastUpdate}</p>
      </div>

      <div className="tested-details">
        <h4>Tested</h4>
        <h3>{props.samplesCount ? indFormat(props.samplesCount) : ''}</h3>
        <p>As of {props.samplesLastUpdate}</p>
      </div>
    </div>
  );
}

export default Header;
