import * as d3 from 'd3';

export default function() {
  const w = 800,
    h = 600,
    padding = 1,
    scale = 10,
    dataset = Array.from({ length: 25 }, () => Math.floor(Math.random() * 30));

  const svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  const x = (i: number) => i * (w / dataset.length);
  const y = (i: number) => i * scale;

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', d => 'rgb(0, 0, ' + y(d) + ')')
    .attr('x',  (_, i: number) => x(i))
    .attr('y', d => h - y(d))
    .attr('width',  w / dataset.length - padding)
    .attr('height',  d => y(d));

  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text(d => d)
    .attr('x', (_, i: number) => x(i) + (w / dataset.length - padding) / 2)
    .attr('y', d => h - y(d) + 14)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
};
