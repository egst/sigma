import { sleep } from '/src/js/util.js'

const Carousel = function (carousel, {arrows, auto = true} = {}) {
    if (carousel == null)
        return console.warn('Carousel element not found.')

    // TODO: Snap - react to user partial scroll and screen size change.

    this.carousel = carousel

    if (auto)
        this.run()

    if (arrows != null)
        this.bindArrows(arrows)
}

Carousel.prototype.bindArrows = function ([prev, next]) {
    prev.addEventListener('click', () => this.prev())
    next.addEventListener('click', () => this.next())
}

Carousel.prototype.next = function () {
    const currentOffset = this.carousel.scrollLeft
    const pageWidth     = this.carousel.offsetWidth
    const carouselWidth = this.carousel.scrollWidth
    const movedOffset   = Math.ceil(currentOffset + pageWidth)
    const newOffset     = movedOffset < carouselWidth ? movedOffset : 0
    this.carousel.scroll({
        left: newOffset,
        behavior: 'smooth'
    })
}

Carousel.prototype.prev = function () {
    const currentOffset = this.carousel.scrollLeft
    const pageWidth     = this.carousel.offsetWidth
    const carouselWidth = this.carousel.scrollWidth
    const movedOffset   = Math.ceil(currentOffset - pageWidth)
    const newOffset     = movedOffset >= 0 ? movedOffset : carouselWidth - pageWidth
    this.carousel.scroll({
        left: newOffset,
        behavior: 'smooth'
    })
}

Carousel.prototype.run = async function () {
    while (true) {
        await sleep(8000)
        this.next()
    }
}

export default Carousel
