import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import StorageIcon from '@material-ui/icons/Storage';

function Footer() {
  return (
    <div className="footer">
      <a
        target="blank"
        href="https://github.com/swarup4741/Covid19_Help_India-REACT"
      >
        {' '}
        <h3>Covid19 Help India</h3>
      </a>{' '}
      <p>We stand with everyone fighting on the frontlines</p>
      <div className="footer-links">
        <a
          target="blank"
          href="https://github.com/swarup4741/Covid19_Help_India-REACT"
        >
          <GitHubIcon className="github" />
        </a>
        <a target="blank" href="https://api.covid19india.org/">
          <StorageIcon className="apis" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
