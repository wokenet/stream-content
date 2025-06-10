import sample from 'lodash/sample'

import './overlay.css'

export function renderOverlay(svg) {
  const containerEl = document.createElement('div')
  containerEl.id = 'container'
  containerEl.innerHTML = svg
  document.body.appendChild(containerEl)

  const timeFormat = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: 'America/Los_Angeles',
    timeZoneName: 'short',
  })

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })

  function position() {
    containerEl.className = sample(['nw', 'ne', 'se'])
  }

  setInterval(position, 1000 * 60 * 10)
  position()

  function updateClock() {
    document.getElementById('timestamp').textContent = timeFormat.format()
    document.getElementById('date').textContent = dateFormat.format()

    const days = Math.floor(
      (Date.now() - 1590390000000) / (24 * 60 * 60 * 1000),
    )

    const dayEl = document.getElementById('day')
    if (dayEl) {
      dayEl.textContent = `Day ${days}`
    }
  }

  setInterval(updateClock, 500)
  updateClock()
}
