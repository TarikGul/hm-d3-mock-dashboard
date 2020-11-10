import * as d3 from 'd3'

const MARGIN = { TOP: 40, BOTTOM: 300, LEFT: 70, RIGHT: 100 }
const WIDTH = window.innerWidth - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = window.innerHeight - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
    constructor(element, data, updateName, from, to) {
        debugger
        let vis = this
        vis.from = from
        vis.to = to
        vis.updateName = updateName
        vis.sortedData = data.sort((a, b) => b.first_seen_utc - a.first_seen_utc)
        vis.make_x_gridlines = vis.make_x_gridlines.bind(this);
        vis.make_y_gridlines = vis.make_y_gridlines.bind(this);
        
        vis.g = d3.select(element)
            .append('svg')
            .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            // .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
            .append('g')
            .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        vis.x = d3.scaleTime()
            .range([0, WIDTH])

        vis.y = d3.scaleLinear()
            .range([HEIGHT, 0])

        vis.xAxisGroup = vis.g.append('g')
            .attr('transform', `translate(0, ${HEIGHT})`)
        vis.yAxisGroup = vis.g.append('g')

        vis.g.append('text')
            .attr('x', WIDTH / 2)
            .attr('y', HEIGHT + 40)
            .attr('font-size', 20)
            .attr('text-anchor', 'middle')
            .text('Day Part')

        vis.g.append('text')
            .attr('x', -(HEIGHT / 2))
            .attr('y', -50)
            .attr('transform', 'rotate(-90)')
            .attr('font-size', 20)
            .attr('text-anchor', 'middle')
            .text('TTS')

        // add the X gridlines
        vis.g.append('g')
            .attr('class', 'grid')
            .attr('transform', 'translate(0,' + HEIGHT + ')')
            .call(vis.make_x_gridlines(vis.x)
                .tickSize(-HEIGHT)
                .tickFormat('')
            )

        // add the Y gridlines
        vis.g.append('g')
            .attr('class', 'grid')
            .call(vis.make_y_gridlines(vis.y)
                .tickSize(-WIDTH)
                .tickFormat("")
            )
        
        vis.update(data, vis.from, vis.to)
    }

    update(data, from, to) {
        let vis = this
        vis.data = data

        let colors = {
            1: 'red',
            2: 'blue',
            3: 'green',
            4: 'orange',
            5: 'purple',
            6: 'teal'
        }

        vis.x.domain([new Date(from), new Date(to)])
        // vis.x.domain([new Date(vis.sortedData[vis.sortedData.length - 1].first_seen_utc * 1000), 
        //                  d3.max(vis.sortedData, d => new Date(d.first_seen_utc * 1000))])
        vis.y.domain([0, d3.max(vis.sortedData, d => Number(d.tts))])

        const xAxisCall = d3.axisBottom(vis.x)
        const yAxisCall = d3.axisLeft(vis.y)

        vis.xAxisGroup.transition(1000).call(xAxisCall)
        vis.yAxisGroup.transition(1000).call(yAxisCall)

        // JOIN
        const circles = vis.g.selectAll('circle')
            .data(vis.data, d => d.id)

        // EXIT
        circles.exit()
            .transition(1000)
            .attr('cy', vis.y(0))
            .remove()

        // UPDATE
        circles.transition(1000)
            .attr('cx', d => vis.x(new Date(d.first_seen_utc * 1000)))
            .attr('cy', d => vis.y(d.tts))

        // ENTER
        circles.enter().append('circle')
            .attr('cy', vis.y(0))
            .attr('cx', d => vis.x(new Date(d.first_seen_utc * 1000)))
            .attr('r', 1.5)
            .attr('fill', d => colors[d.day_part])
            .on('click', d => vis.updateName(d.id))
            .transition(1000)
            .attr('cy', d => vis.y(d.tts))

    }

    // gridlines in x axis function
    make_x_gridlines(x) {
        return d3.axisBottom(x)
            .ticks(5)
    }

    // gridlines in y axis function
    make_y_gridlines(y) {
        return d3.axisLeft(y)
            .ticks(5)
    }
}

export default D3Chart