import * as d3 from 'd3';

const w = 800,
  h = 600,
  padding = 30;

let dataset = Array.from({ length: 20 }, () => [Math.random() * 100, Math.random() * 100]);

const xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[0])])
  .range([padding, w - padding * 2])
  .nice();

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([h - padding, padding])
  .nice();

const aScale = d3.scaleSqrt()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([4, 20])
  .nice();

const colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([0, 255])
  .nice();

const svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('circle')
  .data(dataset)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d[0]))
  .attr('cy', d => yScale(d[1]))
  .attr('r', d => aScale(d[1]))
  .attr('fill', d => 'rgb(0, 0, ' + colorScale(d[1]) + ')')

const xAxis = d3.axisBottom()
  .scale(xScale)
  // .ticks(5)
  // .tickValues([1, 2, 5, 15, 40, 100]);

const yAxis = d3.axisLeft()
  .scale(yScale)
  // .ticks(5);

svg.append('g')
  .classed('x axis', true)
  .attr('transform', `translate(0, ${h - padding})`)
  .call(xAxis);

svg.append('g')
  .classed('y axis', true)
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis);

const updateRandom = function() {
  dataset = Array.from({ length: 20 }, () => [Math.random() * 100, Math.random() * 100]);

  xScale.domain([0, d3.max(dataset, d => d[0])]);
  yScale.domain([0, d3.max(dataset, d => d[1])]);
  aScale.domain([0, d3.max(dataset, d => d[1])])
  colorScale.domain([0, d3.max(dataset, d => d[1])])
  // scale.domain([0, d3.max(dataset)]);

  svg.selectAll('circle')
    .data(dataset)
    .transition()
    .delay((d, i) => i / dataset.length * 1000)
    .duration(500)
    .attr('cx', d => xScale(d[0]))
    .attr('cy', d => yScale(d[1]))
    .attr('r', d => aScale(d[1]))
    .attr('fill', d => 'rgb(0, 0, ' + colorScale(d[1]) + ')');

  svg.select('.x .axis')
    .transition()
    .duration(500)
    .call(xAxis);

  svg.select('.y .axis')
    .transition()
    .duration(500)
    .call(yAxis);
};

setInterval(updateRandom, 3500);
