import * as d3 from 'd3';

export default function() {
  const w = 800,
    h = 600,
    padding = 30;

  let dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

  const xScale = d3.scaleBand<number>()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, w - padding * 2])
    .paddingInner(0.05);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, h]);

  const colorScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, 255]);

  const svg = d3.select('body')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('fill', (d: number) => 'rgb(0, 0, ' + colorScale(d) + ')')
    .attr('x', (_: number, i: number) => xScale(i))
    .attr('y', (d: number) => h - yScale(d))
    .attr('width', xScale.bandwidth())
    .attr('height', (d: number) => yScale(d));

  svg.selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .text((d: number) => d)
    .attr('x', (_:number, i: number) => xScale(i) + xScale.bandwidth() / 2)
    .attr('y', (d: number) => h - yScale(d) + 14)
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle');


  const scale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([h, 0]);

  const yAxis = d3.axisLeft(scale);

  svg.append('g')
    .classed('axis', true)
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis);

  const p = document.createElement('p');
  const t = document.createTextNode('click for new data values');
  p.appendChild(t);
  document.body.appendChild(p);

  const updateRandom = function() {
    dataset = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));

    yScale.domain([0, d3.max(dataset)]);
    scale.domain([0, d3.max(dataset)]);
    colorScale.domain([0, d3.max(dataset)]);

    svg.selectAll('rect')
      .data(dataset)
      .transition()
      .delay((_: number, i: number) => i / dataset.length * 1000)
      .duration(500)
      .attr('fill', (d: number) => 'rgb(0, 0, ' + colorScale(d) + ')')
      .attr('y', (d: number) => h - yScale(d))
      .attr('height', (d: number) => yScale(d));

    svg.selectAll('text')
      .data(dataset)
      .transition()
      .delay((_: number, i: number) => i / dataset.length * 1000)
      .duration(500)
      .text((d: number) => d)
      .attr('y', (d: number) => {
        const pos = h - yScale(d) + 14;
        if (pos > h - 14) {
          return h - 14;
        } else {
          return pos;
        }
      })
      .attr('fill', (d: number) => {
        const pos = h - yScale(d) + 14;
        if (pos > h - 14) {
          return 'black';
        } else {
          return 'white';
        }
      });

    svg.select<SVGGElement>('.axis')
      .transition()
      .duration(500)
      .call(yAxis);
  };

  setInterval(updateRandom, 3500);

  d3.select('p').on('click', updateRandom);
};
