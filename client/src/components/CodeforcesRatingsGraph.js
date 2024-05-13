import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/auth';

const CodeforcesContestRatingGraph = () => {
  const [data, setData] = useState(null);
  const [auth,setAuth] = useAuth()
  useEffect(() => {
    const fetchContestHistory = async () => {
      try {
        // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
        let handle;
        if (auth?.user) {
          const { cfid } = auth.user;
          handle = cfid
        }
        const response = await axios.get('https://ninjax.onrender.com/server/v1/forces/rating', { params: { handle } });
        const contests = response?.data?.result;
        // Extract contest dates and ratings
        const contestData = contests?.map(contest => ({
          date: new Date(contest?.ratingUpdateTimeSeconds * 1000), // Convert timestamp to Date object
          rating: contest.newRating,
        }));

        // Prepare data for Chart.js
        const chartData = {
          labels: contestData?.map(({ date }) => date.toLocaleString('default', { month: 'short', year: 'numeric' })),
          datasets: [
            {
              label: 'User Rating',
              data: contestData?.map(({ rating }) => rating),
              fill: false,
              borderColor: '#FFA500',
              tension: 0.1,
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchContestHistory();
  }, [auth?.user]);

  return (
    <div className='cf_bar mx-auto' >
      {data && (
        <Line
          data={data}
          options={{
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Rating',
                },
                suggestedMin: 0,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    return `User Rating: ${context.parsed.y}`;
                  },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default CodeforcesContestRatingGraph;