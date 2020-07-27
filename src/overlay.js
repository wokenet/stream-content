import './overlay.css'
import svg from 'raw-loader!./overlay.svg'

const containerEl = document.createElement('div')
containerEl.id = 'container'
containerEl.innerHTML = svg
document.body.appendChild(containerEl)

const timeFormat = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'long',
  hourCycle: 'h24',
  timeZoneName: 'short',
})

function update() {
  document.getElementById('timestamp').textContent = timeFormat.format()
}

setInterval(update, 1000)
update()
