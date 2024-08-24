import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TasksCompleted = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const width = 400;
    const height = 300;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    const data = { completed: 60, remaining: 40 };

    const color = d3.scaleOrdinal()
      .domain(Object.keys(data))
      .range(["#FF7D29", "#FFEEA9"]);

    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie()
      .value(d => d[1])
      .startAngle(Math.PI / 2)  // Start from the bottom
      .endAngle(Math.PI * 2.25); // Cover 270 degrees, leaving the bottom empty

    const data_ready = pie(Object.entries(data));

    svg
      .selectAll('path')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(radius * 0.5)
        .outerRadius(radius)
      )
      .attr('fill', d => color(d.data[0]))
      .attr("stroke", "white")
      .style("stroke-width", "2px");

    svg
      .selectAll('text')
      .data(data_ready)
      .join('text')
      .text(d => d.data[0])
      .attr("transform", d => `translate(${d3.arc().innerRadius(radius * 0.5).outerRadius(radius).centroid(d)})`)
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }, []);

  return (
    <svg ref={chartRef}></svg>
  );
};

export default TasksCompleted;
