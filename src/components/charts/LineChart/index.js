import React from 'react';
import dot from '../../../images/dot.svg';
import { formatNum } from '../../../utils/numbers';
import {
  LineChart, Line, CartesianGrid, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import './charts.css';


const CustomTooltip = ({ active, payload }) => {
  if (active && payload) {
    return (
      <>
        <div
          className="rectangle-65"
          style={{ background: '#485563', boxShadow: 'none' }}
        >
          <>
            <div className="salesLegend" />
            <span
              style={{
                width: 76,
                height: 16,
                objectFit: 'contain',
                fontFamily: 'Roboto',
                fontSize: 14,
              }}
            >
              Sales :
            </span>
            <span
              style={{
                width: 65,
                height: 16,
                objectFit: 'contain',
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: 'bold',
              }}
            >
              { formatNum(payload[0].value)}
            </span>
          </>
          <div>
            <div className="budgetLegend" />
            <>
              <span
                style={{
                  width: 76,
                  height: 16,
                  objectFit: 'contain',
                  fontFamily: 'Roboto',
                  fontSize: 14,
                }}
              >
              Budget :
              </span>
              <span
                style={{
                  width: 65,
                  height: 16,
                  objectFit: 'contain',
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
              >
                { formatNum(payload[1].value)}
              </span>
            </>
          </div>
        </div>
        <div className="triangle" />
      </>
    );
  }
  return null;
};
const CustomActiveDot = ({ active }) => {
  if (active) {
    return (
      <div className="rectangle" stroke="#FFF">
        <img src={dot} fill="none" alt="ActiveDot" />
      </div>
    );
  }
  return null;
};

 const  AwesomeLineChart = (props) => {
    const {
      family, background, boxshadow, familyname, onClick,
      chartWidth, chartHeight, horizontal, stroke, label, disabled, salesSum, currentYear,
    } = props;
    return (
      <div
        style={{
          opacity: disabled ? 0.5 : 1,
          height: chartHeight,
          width: chartWidth,
          borderRadius: '4px',
          background,
          boxShadow: boxshadow,
          marginBottom: '20px',
          float: horizontal ? 'right' : '',
        }}
      >
        <span
          role="button"
          aria-hidden
          className="fertilizers"
          style={{ cursor: onClick ? 'pointer' : 'auto' }}
          onClick={onClick}
          onKeyPress={() => onClick()}
        >
          {familyname}
        </span>
        <span
          style={{
            position: 'relative',
            left: (familyname === 'Fertilizers') ? -70 : -30,
            top: 40,
            objectFit: 'contain',
            fontFamily: 'Roboto',
            fontSize: 16,
            letterSpacing: -0.39,
            color: '#ffffff',
          }}
        >
          {`${currentYear} : ${formatNum(salesSum)} (t)`}
        </span>
        <ResponsiveContainer width="100%" height="85%">
          <LineChart
            data={family}
            style={{
              borderRadius: '4px', bottom: '-15px', position: 'relative',
            }}
            animationDuration={10000000}
          >
            <CartesianGrid className="rectangle" stroke={stroke} horizontal={false} />
            <XAxis interval={0} dataKey="date" stroke={label} axisLine={false} tickLine={false} />
            { !disabled && (
              <Tooltip
                active
                content={<CustomTooltip />}
                wrapperStyle={{
                  zIndex: 200,
                  width: 40,
                  height: 165,
                  left: -30,
                  top: 8,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255, 255, 255, 0.31)  100%)',
                }}
              />
            ) }
            <Line
              isAnimationActive
              type="monotone"
              dataKey="sales"
              stroke="rgba(255,255,255,0.8)"
              style={{
                strokeWidth: '3px',
              }}
              activedot={<CustomActiveDot />}
              dot={false}
            />
            <Line
              isAnimationActive
              type="monotone"
              dataKey="budget"
              stroke="rgba(255,255,255,0.8)"
              strokeDasharray="8 4"
              style={{
                strokeWidth: '3px',
              }}
              activedot={<CustomActiveDot />}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );

}
export default AwesomeLineChart;
