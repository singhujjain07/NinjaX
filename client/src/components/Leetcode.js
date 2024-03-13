import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const SolvedProblemsCard = ({ easy, medium, hard, totalEasy, totalMedium, totalHard }) => {

  // Sample data (replace with your actual data)
  const totalSolved = easy + medium + hard;
  const totalProblems = totalEasy + totalMedium + totalHard;

  const totalPercentage = (totalSolved / totalProblems) * 100;
  const easyPercentage = (easy / totalEasy) * 100;
  const mediumPercentage = (medium / totalMedium) * 100;
  const hardPercentage = (hard / totalHard) * 100;

  return (
    <div className='problems_card'>
      {/* <div className="card">
        <div className="card-header" >Solved Problems</div>
        <div className="circular-progress">
          <CircularProgressbar
            value={totalPercentage}
            text={`${totalSolved}/${totalProblems}`}
            styles={buildStyles({
              pathColor: '#007bff',
              textColor: '#007bff',
              trailColor: '#f0f0f0',
              textSize: '16px'
            })}
          />
        </div>
        <div className="horizontal-progress">
          <div className="progress-bar easy" style={{ width: `${easyPercentage}%` }}></div>
          <div className="progress-bar medium" style={{ width: `${mediumPercentage}%` }}></div>
          <div className="progress-bar hard" style={{ width: `${hardPercentage}%` }}></div>
        </div>
        <div className="progress-labels">
          <div>Easy: {easy}</div>
          <div>Medium: {medium}</div>
          <div>Hard: {hard}</div>
        </div>
      </div> */}
      <div className="lc_card mb-4 mb-md-0">
        <div className="card-body" >
          <div className="card-header" >Solved Problems</div>
          <div className="circular-progress">
            <CircularProgressbar
              value={totalPercentage}
              text={`${totalSolved}/${totalProblems}`}
              styles={buildStyles({
                pathColor: '#007bff',
                textColor: '#007bff',
                trailColor: '#f0f0f0',
                textSize: '16px'
              })}
            />
          </div>
          <p className="mb-1" style={{ fontSize: '0.8rem' }}>Easy :  {easy}/{totalEasy}</p>
          <div className="progress rounded mb-3" style={{ height: '5px' }}>
            <div className="progress-bar easy" role="progressbar" style={{ width: `${easyPercentage}%` }} aria-valuenow={easyPercentage} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <p className="mb-1" style={{ fontSize: '0.8rem' }}>Medium :  {medium}/{totalMedium}</p>
          <div className="progress rounded mb-3" style={{ height: '5px' }}>
            <div className="progress-bar medium" role="progressbar" style={{ width: `${mediumPercentage}%` }} aria-valuenow={mediumPercentage} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
          <p className="mb-1" style={{ fontSize: '0.8rem' }}>Hard :  {hard}/{totalHard}</p>
          <div className="progress rounded" style={{ height: '5px' }}>
            <div className="progress-bar hard" role="progressbar" style={{ width: `${hardPercentage}%` }} aria-valuenow={hardPercentage} aria-valuemin={0} aria-valuemax={100}></div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SolvedProblemsCard;
