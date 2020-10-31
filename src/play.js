import './play.css'

function main() {
  let [paramsText, url] = location.hash.substr(1).split(';')
  if (!url) {
    url = paramsText
    paramsText = ''
  }

  const params = new URLSearchParams(paramsText)

  let kind = params.get('kind')
  if (!kind) {
    if (/(\.mp4|\.mov)$/.test(url)) {
      kind = 'video'
    } else if (/(\.wav|\.mp3|\.ogg)$/.test(url)) {
      kind = 'audio'
    } else if (/(\.jpg|\.png)$/.test(url)) {
      kind = 'img'
    } else {
      kind = 'iframe'
    }
  }

  if (!['iframe', 'video', 'audio', 'img'].includes(kind)) {
    return
  }

  const el = document.createElement(kind)
  el.src = url

  if (kind === 'iframe') {
    el.allow = 'autoplay'
  }

  if (kind === 'audio' || kind === 'video') {
    el.autoplay = true
  }

  if (kind === 'video') {
    el.controls = false
  }

  if (params.has('hidden')) {
    document.documentElement.classList.add('hidden')
  }
  if (params.has('cover')) {
    document.documentElement.classList.add('cover')
  }
  if ((kind === 'video' || kind === 'audio') && params.has('loop')) {
    el.loop = true
  }

  document.body.appendChild(el)
}

window.addEventListener('hashchange', () => {
  location.reload()
})

main()
