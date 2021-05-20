import {useState} from 'react';
import {indFormat} from '../utils/commonFunction';
import {
  XYPlot,
  LineSeries,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  Crosshair,
} from 'react-vis';

function TimeSeries(props) {
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var max = 0;
  const caseCount = props.caseCount;
  const [hoverData, setHoverData] = useState({});
  const data = props.Data.map((val) => {
    var timestamp = new Date(val.date).getTime();
    max = Math.max(max, val[caseCount]);
    return {
      x: timestamp + 86400000,
      y: val[caseCount],
    };
  });

  return (
    <div
      className="time-curve"
      style={{
        background: `${props.bg}`,
      }}
    >
      <XYPlot
        margin={55}
        height={document.body.clientWidth <= 500 ? 400 : 450}
        width={document.body.clientWidth <= 500 ? 400 : 600}
        xType="time"
        xDomain={[data[0].x, data[data.length - 1].x]}
        yDomain={[data[0].y, max]}
        animation={true}
      >
        <XAxis tickTotal={5} title="Timeline" />
        <YAxis tickTotal={10} tickPadding={5} title="Daily Count" />
        <LineSeries
          animation={true}
          data={data}
          color={props.color}
          curve={'curveMonotoneX'}
          onNearestX={(d) => setHoverData(d)}
          onNearestY={(d) => setHoverData(d)}
        />

        <VerticalGridLines />
        <HorizontalGridLines />
        <Crosshair values={[hoverData]}>
          <div
            style={{
              marginTop: '20%',
              minWidth: '150px',
              borderRadius: '6px',
              background: 'rgb(54, 54, 54)',
              padding: '10px 15px',
            }}
          >
            <p
              style={{
                whiteSpace: 'nowrap',
                fontWeight: '600',
                fontSize: '10px',
                color: `${props.color}`,
                letterSpacing: '0.7px',
              }}
            >
              Date:{' '}
              {hoverData.x
                ? new Date(hoverData.x - 86400000).getDate() +
                  ' ' +
                  month[new Date(hoverData.x - 86400000).getMonth()] +
                  ' ' +
                  new Date(hoverData.x).getFullYear()
                : null}
            </p>
            <p
              style={{
                whiteSpace: 'nowrap',
                fontWeight: '600',
                fontSize: '10px',
                color: `${props.color}`,
                marginTop: '3px',
                letterSpacing: '0.7px',
              }}
            >
              Daily {caseCount.split('y')[1]}:{' '}
              {hoverData.y ? indFormat(hoverData.y) : null}
            </p>
          </div>
        </Crosshair>
      </XYPlot>
    </div>
  );
}

export default TimeSeries;
