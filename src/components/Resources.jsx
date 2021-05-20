import React, {useMemo, useState} from 'react';
import Footer from './Footer';

function Resources() {
  const [resources, setResources] = useState([]);

  const data = useMemo(async () => {
    await fetch(
      'https://api.covid19india.org/crowdsourced_resources_links.json'
    )
      .then((res) => res.json())
      .then((data) => setResources(data.crowdsourcd_resources_links));
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Resources</h1>
      <article className="resources">
        <p className="disclaimer">
          The resources provided down below or in this website may not be upto
          date or correct. It is collected from various sources some of which
          are official while others may not be. It is a strict reminder to the
          user that this website intends to help people of India who are in
          search of resources related to Covid19 and hence we request our users
          to VERIFY the data by themselves before taking any action. We are just
          sharing gathered information and are NO way responsible for what is
          being shared. We strongly AVOID use of Black Market Resources.
        </p>
        <div className="resrc-pdf-wrapper">
          <a className="resrc-header" href="https://www.theuncutteam.com/">
            <h3>Regional resources from UNCUT team</h3>
          </a>

          <div className="pdf-container">
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-delhi"
            >
              Delhi
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-gujarat"
            >
              Gujarat
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-jk"
            >
              Jammu and Kashmir
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-up"
            >
              Uttar Pradesh
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-nagpur"
            >
              Nagpur
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-odisha"
            >
              Odisha
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-rajasthan"
            >
              Rajasthan
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-jharkhand"
            >
              Jharkhand
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-south"
            >
              South India
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-maharashtra"
            >
              Maharastra
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-bengal"
            >
              West Bengal
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-chhatisgarh"
            >
              Chattisgarh
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-mp"
            >
              Madhya Pradesh
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-bihar"
            >
              Bihar
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-uttarakhand"
            >
              Uttarakhand
            </a>
            <a
              className="resrc-pdf-link"
              target="blank"
              href="https://www.theuncutteam.com/covid-northeast"
            >
              North East
            </a>
          </div>
        </div>
        <div className="resrcLinks">
          {resources
            .filter(
              (resource) =>
                resource.shoulddisplay === 'Yes' &&
                resource.link !== 'https://www.theuncutteam.com/covidresources'
            )
            .map((resrc, idx) =>
              resrc ? (
                <div className="linkContainer" key={idx}>
                  <a href={resrc.link} target="blank">
                    <h4>{resrc.description || 'Independent Aggregator'}</h4>
                    <p>{resrc.link}</p>
                  </a>
                </div>
              ) : (
                ''
              )
            )}
        </div>
      </article>
      <Footer />
    </div>
  );
}

export default Resources;
