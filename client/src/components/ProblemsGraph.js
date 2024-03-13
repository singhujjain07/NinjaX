import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
const CodeforcesProblemsChart = ({problemsForces}) => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const fetchProblemsByRating = async () => {
  //     try {
  //       const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
  //       const response = await axios.get('/server/v1/forces/problems', { params: { handle } });
  //       // Filter submissions by problems solved
  //       const submissions = response?.data?.result
  //       const solvedProblems = submissions?.filter(submission => submission.verdict === 'OK');

  //       // Count the number of problems solved for each rating
  //       const problemsByRating = {};
  //       solvedProblems.forEach(submission => {
  //         const rating = submission.problem.rating || 'Unrated';
  //         problemsByRating[rating] = (problemsByRating[rating] || 0) + 1;
  //       });

  //       // Convert data to format required by Chart.js
  //       const chartData = {
  //         labels: Object.keys(problemsByRating),
  //         datasets: [
  //           {
  //             label: 'Problems Solved',
  //             backgroundColor: 'rgba(75,192,192,0.2)',
  //             borderColor: 'rgba(75,192,192,1)',
  //             borderWidth: 1,
  //             hoverBackgroundColor: 'rgba(75,192,192,0.4)',
  //             hoverBorderColor: 'rgba(75,192,192,1)',
  //             data: Object.values(problemsByRating),
  //           },
  //         ],
  //       };

  //       setData(chartData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchProblemsByRating();
  // }, []);


  
  return (
    <div className='cf_bar mx-auto'>
      {problemsForces && (
        <Bar
          data={problemsForces}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CodeforcesProblemsChart;
