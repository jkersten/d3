import * as d3 from 'd3';
import './styles.scss';

// window.d3 = d3;

let w = 800,
  h = 600,
  padding = 1,
  scale = 10,
  dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25],
  random = Array.from({ length: 25 }, () => Math.floor(Math.random() * 30));

let xScale = d3.scaleBand()
  .domain(d3.range(dataset.length))
  .rangeRound([0, w])
  .paddingInner(0.05);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, h]);

let colorScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, 255]);

let svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('fill', d => 'rgb(0, 0, ' + colorScale(d) + ')')
  .attr('x',  (d, i) => xScale(i))
  .attr('y', d => h - yScale(d))
  .attr('width',  xScale.bandwidth())
  .attr('height',  d => yScale(d));

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(d => d)
  .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
  .attr('y', d => h - yScale(d) + 14)
  .attr('font-family', 'sans-serif')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .attr('text-anchor', 'middle');


const p = document.createElement('p');
const t = document.createTextNode('click for new data values');
p.appendChild(t);
document.body.appendChild(p);

const updateRandom = function() {
  dataset = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

  yScale.domain([0, d3.max(dataset)]);
  colorScale.domain([0, d3.max(dataset)]);

  svg.selectAll('rect')
    .data(dataset)
    .transition()
    .delay((d, i) => i / dataset.length * 1000)
    .duration(500)
    .attr('fill', d => 'rgb(0, 0, ' + colorScale(d) + ')')
    .attr('y', d => h - yScale(d))
    .attr('height',  d => yScale(d));

  svg.selectAll('text')
    .data(dataset)
    .transition()
    .delay((d, i) => i / dataset.length * 1000)
    .duration(500)
    .text(d => d)
    .attr('y', (d) => {
      const pos = h - yScale(d) + 14;
      if (pos > h - 14) {
        return h - 14;
      } else {
        return pos;
      }
    })
    .attr('fill', (d) => {
      const pos = h - yScale(d) + 14;
      if (pos > h - 14) {
        return 'black';
      } else {
        return 'white';
      }
    });
};

setInterval(updateRandom, 3500);

d3.select('p').on('click', updateRandom);
// d3.select('p').on('click', () => {
//   dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25, 5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
// });
