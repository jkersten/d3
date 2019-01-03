import * as d3 from 'd3';
import './styles.scss';

// window.d3 = d3;

let w = 800,
  h = 600,
  padding = 1,
  scale = 10,
  dataset = Array.from({ length: 25 }, () => Math.floor(Math.random() * 30));

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

let x = (i) => i * (w / dataset.length);
let y = (i) => i * scale;

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('fill', d => 'rgb(0, 0, ' + y(d) + ')')
  .attr('x',  (d, i) => x(i))
  .attr('y', d => h - y(d))
  .attr('width',  w / dataset.length - padding)
  .attr('height',  d => y(d));

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => x(i) + (w / dataset.length - padding) / 2)
  .attr('y', d => h - y(d) + 14)
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle')
