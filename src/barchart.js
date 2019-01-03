w = 800;
h = 600;
padding = 30;

dataset = Array.from({ length: 25 }, () => Math.floor(Math.random() * 30));

svg = d3.select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

x = (i) => i * (w / dataset.length);
y = (i) => i * scale;

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
