import React, { useState } from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import '../styles/Heatmap.css'; // Import the CSS file
import Heatmap from './Layout/Heatmap';
import { useLc } from '../context/lc'

const LeetcodeHeatmap = () => {
    const [lc] = useLc();
    const [selectedItem, setSelectedItem] = useState("current");
    const [color, setColor] = useState('success');
    const handleItemClick = (value, color) => {
        setSelectedItem(value);
        setColor(color);
    };
    return (
        <div className='mt-5' >
            <h1 className='ms-lg-5 heatmap_head'>Problem Solving Heatmap</h1>
            <div className="dropdown-center text-end">
                <button className="hm_year btn btn-outline-dark btn-sm dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className={`d-inline-block bg-${color} rounded-circle p-1 me-1 gap-2`} />
                    {selectedItem}
                </button>
                <ul className="dropdown-menu hm_year">
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
            <div className="heatmap-container ms-lg-5">
                <Heatmap data={lc.calendar} year={selectedItem} />
            </div>
        </div>
    )
}

export default LeetcodeHeatmap