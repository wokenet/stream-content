import './background.css'
import backgroundVideo from 'url-loader!./background.mp4'

const v = document.createElement('video')
v.src = backgroundVideo
v.muted = true
v.autoplay = true
v.loop = true
document.body.appendChild(v)
