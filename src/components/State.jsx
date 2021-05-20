import React, {useEffect, useState} from 'react';
import Card from './Card';
import Search from './Search';
import Districts from './Districts';
import {STATE_CODES, NO_STATE_DIST_DATA} from '../Data/Constants';
import Header from './Header';
import {indFormat} from '../utils/commonFunction';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function State(props) {
  const [stateData, setStateData] = useState({});
  const [selectedDist, setSelectedDist] = useState({});
  const [districtData, setDistrictData] = useState([]);
  const [districtName, setDistrictName] = useState([]);
  const [stateBeds, setStateBeds] = useState({});

  useEffect(() => {
    const data = async () => {
      const response = await fetch(
        'https://api.covid19india.org/v4/min/data.min.json'
      );
      const newData = await response.json();

      setStateData({
        counts: newData[props.stateCode].total,
        meta: newData[props.stateCode].meta,
      });

      setDistrictData(
        Object.values(
          Object.values(newData)[STATE_CODES.indexOf(props.stateCode)].districts
        )
      );
      setDistrictName(
        Object.keys(
          Object.values(newData)[STATE_CODES.indexOf(props.stateCode)].districts
        )
      );
    };

    data();
  }, [props.stateCode]);

  useEffect(() => {
    async function fetch_beds_data() {
      const res = fetch('https://api.rootnet.in/covid19-in/hospitals/beds')
        .then((res) => res.json())
        .then((data) => {
          setStateBeds(
            data.data.regional.filter(
              (item) => item.state === props.stateName
            )[0]
          );
        });
    }
    fetch_beds_data();
  }, []);

  useEffect(() => {
    setSelectedDist({
      distData: districtData[0],
      distName: districtName[0],
    });
  }, [districtName[0]]);

  return (
    <div className="container">
      {stateData.counts && (
        <Header
          name={props.stateName}
          samplesCount={stateData.counts.tested ? stateData.counts.tested : ''}
          samplesLastUpdate={stateData.meta.tested.last_updated}
          metaLastUpdate={stateData.meta.last_updated.split('T')[0]}
        />
      )}

      <Search />
      {stateData.counts && (
        <div className="cards">
          {['Confirmed', 'Active', 'Recovered', 'Deceased'].map((val, idx) => {
            if (val === 'Active') {
              const Tcount =
                stateData.counts['confirmed'] -
                stateData.counts['recovered'] -
                stateData.counts['deceased'];
              return (
                <Card
                  key={idx}
                  className="card"
                  caseText={val}
                  caseCount={Tcount ? Tcount : ''}
                  newCaseCount=" "
                />
              );
            } else {
              return (
                <Card
                  key={idx}
                  className="card"
                  caseText={val}
                  caseCount={
                    stateData.counts[`${val.toLowerCase()}`]
                      ? stateData.counts[`${val.toLowerCase()}`]
                      : ' '
                  }
                  newCaseCount=" "
                />
              );
            }
          })}
        </div>
      )}
      {stateData.counts && (
        <h3 className="dose-administered">
          <VerifiedUserIcon style={{marginRight: '10px', fontSize: '1.5em'}} />
          {indFormat(stateData.counts.vaccinated) + ' '} vaccine doses
          administered
        </h3>
      )}

      {!NO_STATE_DIST_DATA.includes(props.stateCode) ? (
        <div className="options">
          <select
            name="district"
            id="dist-opt"
            defaultValue={{
              distData: districtData[0],
              distName: districtName[0],
            }}
            onChange={(e) =>
              setSelectedDist({
                distData:
                  districtData[districtName.indexOf(e.currentTarget.value)],
                distName: e.currentTarget.value,
              })
            }
          >
            {districtName
              .filter((dist) => dist !== 'Other State')
              .map((district, idx) => (
                <option key={idx} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <h3
          style={{
            marginTop: '3em',
            color: '#ff4444',
            padding: '0.5em 2em',
            borderRadius: '0.5em',
            background: 'rgba(255, 0, 0, 0.045)',
          }}
        >
          District-wise data not available
        </h3>
      )}

      {selectedDist.distName !== 'Unknown' &&
      selectedDist.distData !== undefined ? (
        <Districts
          districtName={selectedDist.distName}
          districtData={selectedDist.distData}
        />
      ) : null}
      {stateBeds && (
        <div className="statewise-beds">
          <p>Rural Beds : {stateBeds.ruralBeds} </p>
          <p>Rural Hospitals : {stateBeds.ruralHospitals}</p>
          <p>Urban Beds : {stateBeds.urbanBeds} </p>
          <p>Rural Hospitals : {stateBeds.urbanHospitals} </p>
        </div>
      )}
    </div>
  );
}

export default State;
