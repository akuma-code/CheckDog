class QuickAction {
    $elems = document.querySelectorAll('[data-quickaction]')
    constructor() {
        this.elems = Array.from(this.$elems);
        this.elems.forEach(elem => {
            const {
                quickaction: handler,
                eventtype
            } = elem.dataset
            if (handler && eventtype) elem.addEventListener(eventtype, this[handler].bind(this))
        })
    }

    clearInput(event) {
        event.preventDefault();
        return event.target.value = ''
    }


}

new QuickAction()

function calcDeadline() {
    const toMS = (days) => days * 24 * 60 * 60 * 1000;
    const now = new Date();
    const dl = new Date(toMS(8));
    const result = new Date(now + dl);
    console.log('dl', dl, 'now:', now);
    console.log(result);

}

calcDeadline()