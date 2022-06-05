const Header = function (header) {
    if (header == null)
        return console.warn('Header element not found.')

    const handler = () => {
        const threshold    = 150
        const windowOffset = window.scrollY
        if (windowOffset > threshold)
            header.classList.add('scroll')
        else
            header.classList.remove('scroll')
    }
    document.addEventListener('scroll', handler)
    document.addEventListener('resize', handler)
    // TODO: rotate? ohter events?
}

export default Header
