w = 800;
h = 600;
padding = 30;
dataset = Array.from({ length: 20 }, () => [Math.random() * 50, Math.random() * 10]);

let xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[0])])
  .range([padding, w - padding * 2])
  .nice();
let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([h - padding, padding])
  .nice();
let colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([0, 255])
  .nice();
let aScale = d3.scaleSqrt()
  .domain([0, d3.max(dataset, d => d[1])])
  .range([4, 20])
  .nice();

svg = d3.select('body')
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

// svg.selectAll('text')
//   .data(dataset)
//   .enter()
//   .append('text')
//   .text(d => `${d[0]},${d[1]}`)
//   .attr('x', d => xScale(d[0]))
//   .attr('y', d => yScale(d[1]))
//   .attr('font-family', 'sans-serif')
//   .attr('font-size', '11px')
//   .attr('fill', 'red')
//   .attr('text-anchor', 'middle')

let xAxis = d3.axisBottom()
  .scale(xScale)
  // .ticks(5)
  .tickValues([1, 2, 5, 15, 40, 100]);

let yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(5);

svg.append('g')
  .classed('axis', true)
  .attr('transform', `translate(0, ${h - padding})`)
  .call(xAxis);

svg.append('g')
  .classed('axis', true)
  .attr('transform', `translate(${padding}, 0)`)
  .call(yAxis);
