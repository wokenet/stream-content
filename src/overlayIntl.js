import * as topojson from 'topojson-client'
import world from 'world-atlas/countries-110m.json'
const d3 = Object.assign(
  {},
  require('d3-selection'),
  require('d3-timer'),
  require('d3-geo'),
  require('d3-geo-projection'),
)

import svg from 'raw-loader!./overlayIntl.svg'
import { renderOverlay } from './overlayShared'

function renderGlobe() {
  const globePath = document.querySelector('#globe-geometry')
  console.log(globePath)
  const { width, height } = globePath.getBoundingClientRect()

  const projection = d3
    .geoOrthographic()
    .scale(width / 2)
    .translate([width / 2, height / 2])

  const path = d3.geoPath().projection(projection)

  d3.select(globePath)
    .datum(topojson.feature(world, world.objects.countries))
    .attr('d', path)

  d3.timer(function (elapsed) {
    projection.rotate([0.01 * elapsed, 0, 0])
    d3.select(globePath).attr('d', path)
  })
}

renderOverlay(svg)
renderGlobe()
