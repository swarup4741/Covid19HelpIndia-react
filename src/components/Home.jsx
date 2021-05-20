import {useEffect, useState} from 'react';
import Card from './Card';
import Search from './Search';
import TimeSeries from './TimeSeries';
import {indFormat} from '../utils/commonFunction';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Header from './Header';
import Footer from './Footer';

function Home() {
  const [timeSeries, setTimeSeries] = useState();
  const [tested, setTested] = useState({});
  const [dose, setDose] = useState('');
  const [cases, setCases] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    const fetch_data = async () => {
      const response = await fetch('https://api.covid19india.org/data.json');
      const data = await response.json();

      const testedData = data.tested;
      const testedStats = testedData[testedData.length - 1];

      setLastUpdate(data.statewise[0].lastupdatedtime);

      setTested({
        samplesCount: testedStats.totalsamplestested,
        samplesLastUpdate: testedStats.testedasof,
      });

      setDose(testedStats.totaldosesadministered);

      setTimeSeries(data.cases_time_series);
      setCases([
        {
          caseText: 'Confirmed',
          newCaseCount: data.statewise[0].deltaconfirmed,
          caseCount: data.statewise[0].confirmed,
        },
        {
          caseText: 'Active',
          newCaseCount: ' ',
          caseCount: data.statewise[0].active,
        },
        {
          caseText: 'Recovered',
          newCaseCount: data.statewise[0].deltarecovered,
          caseCount: data.statewise[0].recovered,
        },
        {
          caseText: 'Deceased',
          newCaseCount: data.statewise[0].deltadeaths,
          caseCount: data.statewise[0].deaths,
        },
      ]);
    };

    fetch_data();
  }, []);
  console.log(lastUpdate);
  return (
    <div className="container">
      <Header
        name={'India'}
        samplesCount={tested.samplesCount}
        samplesLastUpdate={tested.samplesLastUpdate}
        metaLastUpdate={lastUpdate}
      />
      <Search />
      <div className="cards">
        {cases.map((item, key) => {
          return (
            <Card
              className="card"
              key={key}
              caseText={item.newCaseCount ? item.caseText : ' '}
              newCaseCount={item.caseCount ? item.newCaseCount : ' '}
              caseCount={item.caseCount ? item.caseCount : ' '}
            />
          );
        })}
      </div>

      <a href="/resources" className="home-resrc-link">
        <FavoriteIcon style={{marginRight: '10px', fontSize: '1.7em'}} />
        <h3 style={{fontWeight: '600'}}> A Handful of Resources</h3>
      </a>

      <h3 className="dose-administered">
        <VerifiedUserIcon style={{marginRight: '10px', fontSize: '1.5em'}} />
        {indFormat(dose) + ' '} vaccine doses administered
      </h3>

      {timeSeries && (
        <div
          className="TimeSeries-graph"
          style={{marginTop: '4em', padding: '0 0em 0 2em'}}
        >
          <TimeSeries
            Data={timeSeries}
            color="#ff4444"
            bg="rgba(255, 192, 203, 0.467)"
            caseCount="dailyconfirmed"
          />
          <TimeSeries
            Data={timeSeries}
            color="#3cb959"
            bg="rgba(24, 201, 118, 0.181)"
            caseCount="dailyrecovered"
          />
          <TimeSeries
            Data={timeSeries}
            color="rgb(150, 151, 155)"
            bg="#dddddd80"
            caseCount="dailydeceased"
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
