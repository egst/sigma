import { sleep, attempt } from '/src/js/util.js'

const noHash   = url  => { url.hash = ''; return url }
const fullUrl  = link => new URL(link, window.location.href)
const samePage = link => noHash(fullUrl(link)).href == noHash(new URL(window.location.href)).href

const Anchor = function (link, menu) {
    this.link   = link
    this.anchor = samePage(this.href)
    this.menu   = menu

    if (!this.anchor)
        return

    if (window.location.hash == fullUrl(this.href).hash)
        this.click()

    link.addEventListener('click', async e => {
        e.preventDefault()
        this.click()
    })
}

Object.defineProperty(Anchor.prototype, 'href', {
    get: function () { return this.link.getAttribute('href') }
});

Anchor.prototype.click = async function () {
    if (!this.anchor)
        return

    const target = this.href.split('#')[1]
    if (target == null)
        return

    this.scrollToId(target)

    window.history.pushState('', '', `#${target}`);
}

/*
Anchor.prototype.click = async function () {
    const target = this.link.getAttribute('href')

    console.log(target)
    if (target.startsWith('#')) {
        this.scrollToId(target)
    } else if (target.startsWith('^')) {
        // custom anchors:
        switch (target.substring(1)) {
        case 'bottom':
            this.scrollToBottom()
        }
    }
}
*/

Anchor.prototype.scrollToId = async function (id) {

    const elem = attempt(() => document.querySelector(`#${id}`))
    if (elem == null)
        return

    if (this.menu)
        this.menu.close()

    const eTop   = elem.getBoundingClientRect().top
    const bTop   = document.body.getBoundingClientRect().top
    //const top    = eTop - bTop + document.documentElement.scrollTop
    const top    = eTop - bTop
    const style  = window.getComputedStyle(elem)
    const offset = style.position == 'relative'
        ? top - window.parseFloat(style.top) // Ignore relative `top` positioning.
        : top

    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })

    /*
    elem.scrollIntoView({
        behavior: 'smooth'
    })
    */

    /*
    let rect = elem.getBoundingClientRect()
    while (rect.top != 0) {
        window.scrollBy(0, Math.sign(rect.top) * 10)
        await sleep(1)
        rect = elem.getBoundingClientRect()
    }
    */
}

Anchor.prototype.scrollToBottom = async function (id) {
    if (this.menu)
        this.menu.close()
    // TODO
}

export default Anchor
