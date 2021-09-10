import React from "react";
import { Bar } from "react-chartjs-2";

const ChartContainer = ({ projects }) => {

    const chartData = {

        labels: projects.map((proj) => proj.project_name),
        datasets: [
            {
                label: "kW production",
                data: projects.map((proj) => proj.kWs),
                backgroundColor: [
                    "#398B93"
                ]
            }
        ]
    }

    return (
        <Bar
            data={chartData}
            height="250px"
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "kW Production per Project"
                    },
                    legend: {
                        display: true,
                        position: "bottom"
                    }
                }
            }}
        />
    )
}

export default ChartContainer;

// Resources:
// https://blog.logrocket.com/using-chart-js-react/