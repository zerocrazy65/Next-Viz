import DefaultLayout from "@/layouts/default";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { name: "A", value: 10 },
  { name: "B", value: 20 },
  { name: "C", value: 15 },
  { name: "D", value: 25 },
  { name: "E", value: 18 },
];

export default function DocsPage() {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    x.domain(data.map((d) => d.name));
    y.domain([0, d3.max(data, (d) => d.value)]);

    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.value))
      .attr("fill", "steelblue");
  }, [data]);

  return (
    <DefaultLayout>
      <svg ref={svgRef} width="400" height="200" />
    </DefaultLayout>
  );
}
