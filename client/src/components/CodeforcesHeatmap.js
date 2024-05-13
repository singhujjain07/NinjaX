import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Heatmap from '../components/Layout/Heatmap'
import { useAuth } from '../context/auth'
import { useForces } from '../context/forces'


const CodeforcesHeatmap = () => {
    // const [data, setData] = useState([]);
    const [forces, setForces] = useForces();
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth()
    const [selectedItem, setSelectedItem] = useState("current");
    const [color, setColor] = useState('success');
    const handleItemClick = (value, color) => {
        console.log(value);
        setSelectedItem(value);
        setColor(color);
    };
    useEffect(() => {
        const fetchSubmissionHistory = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle
                let handle;
                if (auth?.user) {
                    const { cfid } = auth.user;
                    handle = cfid
                }
                const response = await axios.get('https://ninjax.onrender.com/server/v1/forces/problems', { params: { handle } });
                const submissions = response.data.result;

                // Filter submissions to get only solved problems
                const solvedSubmissions = submissions.filter(submission => submission.verdict === 'OK');

                // Extract the submission date and format it as yyyy-mm-dd
                const submissionDates = solvedSubmissions.map(submission => {
                    const date = new Date(submission.creationTimeSeconds * 1000);
                    return date.toISOString().substring(0, 10); // Extract yyyy-mm-dd
                });

                // Count the number of submissions for each date
                const submissionsByDate = submissionDates.reduce((acc, date) => {
                    acc[date] = (acc[date] || 0) + 1;
                    return acc;
                }, {});

                // Convert the data to the format required by the heatmap
                const heatmapData = Object.keys(submissionsByDate).map(date => ({
                    date: new Date(date),
                    count: submissionsByDate[date],
                }));
                // setData(heatmapData);
                setForces(heatmapData);
                localStorage.setItem('forces', JSON.stringify(heatmapData))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSubmissionHistory();
    }, [auth?.user]);
    return (
        <div style={{ alignItems: "center", justifyContent: "center", textAlign: "center", margin: "0 auto" }}>
            <h1 className='heatmap_head'>Problem Solving Heatmap</h1>
            {/* <div className="dropdown-center text-end">
                <button className="btn btn-secondary btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedItem}
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2022')}>
                        <span className="d-inline-block bg-danger rounded-circle p-1" />
                        2022
                    </a></li>
                    <li><a className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2023')}>
                        <span className="d-inline-block bg-warning rounded-circle p-1" />
                        2023
                    </a></li>
                    <li><a className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2024')}>
                        <span className="d-inline-block bg-primary rounded-circle p-1" />
                        2024
                    </a></li>
                    <li><a className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('current')}>
                        <span className="d-inline-block bg-success rounded-circle p-1" />
                        current
                    </a></li>
                </ul>
            </div> */}
            <div className='mx-auto cf_hm'>
                <div className="dropdown-center text-end">
                    <button className="btn btn-outline-dark btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className={`d-inline-block bg-${color} rounded-circle p-1 me-1 gap-2`} />
                        {selectedItem}
                    </button>
                    <ul className="dropdown-menu">
                        <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2022', 'danger')}>
                            <span className="d-inline-block bg-danger rounded-circle p-1" />
                            2022
                        </div></li>
                        <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2023', 'warning')}>
                            <span className="d-inline-block bg-warning rounded-circle p-1" />
                            2023
                        </div></li>
                        <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('2024', 'primary')}>
                            <span className="d-inline-block bg-primary rounded-circle p-1" />
                            2024
                        </div></li>
                        <li><div className="dropdown-item d-flex align-items-center gap-2 py-2" onClick={() => handleItemClick('current', 'success')}>
                            <span className="d-inline-block bg-success rounded-circle p-1" />
                            current
                        </div></li>
                    </ul>
                </div>
                <Heatmap data={forces} year={selectedItem} />
            </div>
        </div>
    )
}

export default CodeforcesHeatmap