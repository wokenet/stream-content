import svg from 'raw-loader!./overlay.svg'
import svgPride from 'raw-loader!./overlayPride.svg'
import { renderOverlay } from './overlayShared'

renderOverlay(location.hash === '#pride' ? svgPride : svg)
