import React, { useRef, useState, useEffect } from 'react';
import D3Chart from './D3Chart';

const ChartWrapper = ({ data, updateName, from, to }) => {
    const chartArea = useRef(null)
    const [chart, setChart] = useState(null)

    useEffect(() => {
        if (!chart) {
            setChart(new D3Chart(chartArea.current, data, updateName, from , to))
        }
        else {
            chart.update(data, from, to)
        }
    }, [chart, data, updateName, from, to])

    return (
        <>
            <div className="chart-area" ref={chartArea}></div>
        </>
    )
}

export default ChartWrapper;
