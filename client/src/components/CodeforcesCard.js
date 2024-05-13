import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/auth'

const CodeforcesCard = ({ totalProblemsSolved }) => {
    const [maxRating, setMaxRating] = useState(0)
    const [rating, setRating] = useState(0)
    const [rank, setRank] = useState("")
    const [maxRank, setMaxRank] = useState("")
    const [contribution, setContribution] = useState("")
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const [handle, setHandle] = useState('');

    useEffect(() => {
        if (auth?.user) {
            const { cfid } = auth.user;
            setHandle(cfid);
        }
    }, [auth?.user])
    useEffect(() => {
        const fetchProblemsByRating = async () => {
            try {
                // const handle = 'singh_ujjain07'; // Replace with your Codeforces handle

                const response = await axios.get('https://ninjax.onrender.com/server/v1/forces/user-info', { params: { handle } });
                setMaxRating(response?.data?.result[0].maxRating)
                setRating(response?.data?.result[0].rating)
                setRank(response?.data?.result[0].rank)
                setMaxRank(response?.data?.result[0].maxRank)
                setContribution(response?.data?.result[0].contribution)
                console.log(response)
            } catch (error) {
                console.log('babadon')
                console.error('Error fetching data:', error);
            }
        };

        fetchProblemsByRating();
    }, [auth?.user, handle]);
    return (
        <div className="card mx-md-3 new_card mt-2">
            <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">ID </p>
                        <p className="mb-0">{auth?.user ? auth?.user?.cfid : 'singh_ujjain07'} </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Rating  </p>
                        <p className="mb-0">{rating} (max-{maxRating}) </p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Rank  </p>
                        <p className="mb-0"> {rank} (max: {maxRank})</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Total Problems Solved </p>
                        <p className="mb-0"> {totalProblemsSolved}</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <p className="mb-0">Contribution </p>
                        <p className="mb-0"> {contribution}</p>
                    </li>
                </ul>
            </div>
        </div>
        // <div className='card mt-3 mb-3 '>
        //     <div className="row no-gutters">
        //         <div className="col-sm-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#858E96", color: "white", fontSize: "20px" }}>
        //             Stats
        //         </div>
        //         <div className="col-sm-8">
        //             <div className="card-body">
        //                 <h5 className="card-title ">{auth?.user?.cfid}</h5>
        //                 <p className="card-text ">
        //                     Rating : {rating} (max-{maxRating})
        //                 </p>
        //                 <p className="card-text ">
        //                     Max-Rank: {rank}
        //                 </p>
        //                 <p className="card-text ">
        //                     Total Problems Solved: {totalProblemsSolved}
        //                 </p>
        //                 {/* <p className="card-text"><small className="text-muted">Last visited 3 mins ago</small></p> */}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CodeforcesCard