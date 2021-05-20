import {indFormat} from '../utils/commonFunction';

function Card(props) {
  return (
    <div className={`card-container ${props.caseText}`}>
      <div className={`card-details ${props.caseText}`}>
        <p className="caseText">{props.caseText}</p>
        {props.newCaseCount === ' ' || props.caseText === 'Active' ? (
          <p className="newCaseCount">&#10084;</p>
        ) : (
          <p className="newCaseCount">+{indFormat(props.newCaseCount)}</p>
        )}
        <p className="caseCount">{indFormat(props.caseCount)}</p>
      </div>
    </div>
  );
}

export default Card;
