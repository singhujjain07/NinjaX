import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-calendar-heatmap/dist/styles.css';
import '../../styles/Heatmap.css'; // Import the CSS file

const Heatmap = ({ data, year }) => {
    let startDate = new Date('2022-12-31');
    let endDate = new Date('2023-12-31');
    if (year) {
        if (year == "current") {
            endDate = new Date();
            startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 365);
        }
        else {
            startDate = new Date(`${year - 1}-12-31`);
            endDate = new Date(`${year}-12-31`);
        }
    }
    // Define your color gradient here
    const colorGradient = [
        '#E8EAF6',
        '#C5CAE9',
        '#9FA8DA',
        '#7986CB',
        '#5C6BC0',
        '#3F51B5',
        '#3949AB',
        '#303F9F',
        '#283593',
        '#1A237E',
    ];

    // Calculate the color intensity based on the number of problems solved
    const getColorIntensity = (count) => {
        const maxCount = Math.max(...data.map(item => item.count));
        const percentage = count / maxCount;
        const colorIndex = Math.floor(percentage * (colorGradient.length - 1));
        return colorGradient[colorIndex];
    };


    const tooltipDataAttrs = (value) => {
        if (!value) return null;
        return {// Set tooltip content
            'data-tooltip-id': 'my-tooltip', // Set tooltip id
            'data-tooltip-content': tooltipContent(value) // Set tooltip content
        };
    };
    const tooltipContent = (value) => {
        if (!value || !value.date) return null;
        const date = new Date(value.date);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const formattedDate = `${day} ${month}, ${year}`;
        return `Date: ${formattedDate}, Count: ${value.count}`;
    };


    return (
        <div className="heatmap-container">
            <CalendarHeatmap
                startDate={startDate} // Start date of the heatmap
                endDate={endDate} // End date of the heatmap
                values={data} // Array of objects containing date and value
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    const val = value.count <= 4 ? value.count : 5
                    return `color-scale-${val}`;
                }}
                tooltipDataAttrs={tooltipDataAttrs}
                showWeekdayLabels={"true"}
                gutterSize={2}
            />
            {/* <button data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">Hover over me</button> */}
            <ReactTooltip id="my-tooltip" />
        </div>
    );
};

export default Heatmap;
