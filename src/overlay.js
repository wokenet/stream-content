import sample from 'lodash/sample'

import './overlay.css'
import svg from 'raw-loader!./overlay.svg'

const containerEl = document.createElement('div')
containerEl.id = 'container'
containerEl.innerHTML = svg
document.body.appendChild(containerEl)

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'long',
  hourCycle: 'h23',
  timeZoneName: 'short',
})

const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function position() {
  containerEl.className = sample(['nw', 'ne', 'se', 'sw'])
}

setInterval(position, 1000 * 60 * 10)
position()

function update() {
  document.getElementById('timestamp').textContent = timeFormat.format()
  document.getElementById('date').textContent = dateFormat.format()

  const days = Math.floor((Date.now() - 1590562800000) / (24 * 60 * 60 * 1000))
  document.getElementById('day').textContent = `Day ${days}`
}

setInterval(update, 500)
update()
