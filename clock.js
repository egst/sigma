import { sleep } from '/src/js/util.js'

const Clock = function (clock) {
    this.clock = clock

    this.run()
}

Clock.prototype.run = async function () {
    while (true) {
        const formatter = new Intl.DateTimeFormat([], {
            timeZone: 'Europe/London',
            weekday:  'short',
            hour:     'numeric',
            minute:   'numeric'
        })
        this.clock.innerText = formatter.format(new Date)
        await sleep(5000)
    }
}

export default Clock
