import React from 'react';
import Footer from './Footer';
function About() {
  return (
    <div className="container">
      <div className="about-sec">
        <h3>
          This an UNOFFICIAL open source project inspired by{' '}
          <span>
            <a target="blank" href="https://www.covid19india.org/">
              COIVD19INDIA.ORG
            </a>
          </span>{' '}
          and is mostly sourced by{' '}
          <a target="blank" href="https://api.covid19india.org/">
            api.covid19india.org
          </a>{' '}
          APIs and other official and unofficial resources. This data is
          entirely available for everyone who would love to use it in the fight
          against Covid19. More resources are available{' '}
          <a target="blank" href="https://telegra.ph/Covid-19-Sources-03-19">
            HERE
          </a>
          .
        </h3>
        <h3>
          This project is mainly build upon the fact that we want to spread the
          resources to as many people as possible.
        </h3>
      </div>
      <Footer />
    </div>
  );
}

export default About;
