import React from "react";
import { Card } from 'react-bootstrap';
import MapContainer from './MapContainer';
import ChartContainer from './ChartContainer';

const VisualData = ({ projects }) => {
    return (
        <div className="visual-section">

            <h3>Project Chart</h3>
            <div className="hr" />
            <Card className="bar"><ChartContainer projects={projects} /></Card>

            <h3>Wind Turbine Generators Map</h3>
            <div className="hr" />
            <div className="map"><MapContainer /></div>
            
        </div>
    )
}

export default VisualData;
