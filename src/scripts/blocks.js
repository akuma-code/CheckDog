//@ts-check
class OutBlock {
    constructor(data = {}) {
        this.data = data;
    }

    get toHTML() {
        return document.querySelector('#out').insertAdjacentElement('afterbegin', this.el(this.data))
    }

    el(values) {
        const elem = document.createElement('div');
        elem.classList.add('out_block');
        elem.oncontextmenu = (event) => {
            event.preventDefault();
            elem.remove()
        };
        elem.insertAdjacentElement('afterbegin', b_data(values));
        elem.insertAdjacentElement('beforeend', b_check());
        return elem
    }
}

class DogBlock {
    constructor(data = getVals()) {
        this.data = data;
        this.makeBlock();
    }

    makeBlock() {
        const {
            name,
            id,
            date,
            summ
        } = this.data;

        const fieldset = `
        <fieldset>
        <legend>${name}</legend>
        <span>${id}</span>
        <span>${date}</span>
        < /fieldset>
        <span>${summ} руб.</span>
        `;

        const elem = document.createElement('div');
        elem.classList.add('block_data');
        elem.insertAdjacentHTML('afterbegin', fieldset);
        return elem
    }
};

class CheckBlock {
    constructor() {
        this.test();
    }
    makeBlock() {
        const fieldset = `
        <fieldset>
        <form name='control'>
        <label for="prov">проверка</label>
        <input type='checkbox' name="prov"></input>
        <label for="correct">корректировка</label>
        <input type='checkbox' name="correct"></input>
        < label for = "disp" > диспетчерская < /label> 
        <input type = 'checkbox' name = "disp" ></input>
        < input type = "button" value = "DONE!" disabled >
        </form> 
        <legend>Контроль</legend> 
        </fieldset>`;

        const elem = document.createElement('div');
        elem.classList.add('block_check');
        elem.insertAdjacentHTML('afterbegin', fieldset)
        return elem
    }

    test() {
        makeElem('control')
    }
}