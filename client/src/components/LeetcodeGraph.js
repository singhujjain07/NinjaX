import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';

const ContestRatingGraph = () => {
    const data = [
        { x: "Contest 1", y: 1200 },
        { x: "Contest 2", y: 1300 },
        { x: "Contest 3", y: 1250 },
        { x: "Contest 4", y: 1400 },
        { x: "Contest 5", y: 1450 }
    ];

    return (
        <div className="container mt-4" style={{height:"500px"}}>
            <h2 className="mb-4">Contest Rating Graph</h2>
            <div className="card">
                <div className="card-body">
                    <VictoryChart theme={VictoryTheme.material} height={300} width={600}>
                        <VictoryAxis />
                        <VictoryAxis dependentAxis />
                        <VictoryLine
                            data={data}
                            x="x"
                            y="y"
                            style={{
                                data: { stroke: "rgb(75, 192, 192)" }
                            }}
                        />
                        <VictoryLabel
                            text="Contest Ratings"
                            x={300}
                            y={30}
                            textAnchor="middle"
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
};

export default ContestRatingGraph;
