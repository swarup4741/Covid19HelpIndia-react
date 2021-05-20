import {indFormat} from '../utils/commonFunction';
function Districts(props) {
  return (
    <div className="districts">
      <div className="districts-wrapper">
        <h3>{props.districtName}</h3>
        <div className="district-caseDetails">
          <p
            className="Confirmed"
            style={{background: 'rgba(255, 0, 0, 0.096)'}}
          >
            Confirmed :{' '}
            {props.districtData.total.confirmed
              ? indFormat(props.districtData.total.confirmed)
              : 'not available'}
          </p>
          <p
            className="Recovered"
            style={{background: 'rgba(24, 201, 118, 0.121)'}}
          >
            Recovered :{' '}
            {props.districtData.total.recovered
              ? indFormat(props.districtData.total.recovered)
              : 'unavailable'}
          </p>
          <p className="Vaccinated">
            Vaccinated :{' '}
            {props.districtData.total.vaccinated
              ? indFormat(props.districtData.total.vaccinated)
              : 'unavailable'}
          </p>
          <p className="Deceased" style={{background: '#e4e4e473'}}>
            Deceased :{' '}
            {props.districtData.total.deceased
              ? indFormat(props.districtData.total.deceased)
              : 'unavailable'}
          </p>
          <p className="Tested">
            Tested :{' '}
            {props.districtData.total.tested
              ? indFormat(props.districtData.total.tested)
              : 'unavailable'}
          </p>
          <p className="Population">
            Population :{' '}
            {props.districtData.meta.population
              ? indFormat(props.districtData.meta.population)
              : 'unavailable'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Districts;
