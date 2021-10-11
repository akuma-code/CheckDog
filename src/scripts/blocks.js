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
            if (event.ctrlKey) elem.remove()
        };
        elem.addEventListener('click', event => {
            const target = event.currentTarget;
            //@ts-ignore
            const form = target.querySelector('form');
            //@ts-ignore 
            const blockbtn = target.querySelector('input[type=button]');
            //@ts-ignore
            blockbtn.onclick = () => target.remove();
            isDone(form)

        })

        elem.insertAdjacentElement('afterbegin', b_data(values));
        elem.insertAdjacentElement('beforeend', b_check());

        return elem
    }
}

class LSBlock {
    constructor() {
        this.store = getDogsFromLocalStorage();

        this.init()
    }

    makeList() {
        const data = this.store;
        const ul = document.createElement('ul');
        let list = '';

        // data.forEach(elem => list += `<li>${JSON.stringify(elem)}</li>`)
        for (let item of data) {
            const {
                id,
                name,
                summ
            } = item;
            list += `<li>${name} // ${id} // ${summ}</li>`
        }
        ul.insertAdjacentHTML('afterbegin', list);

        return ul
    };

    placeElem(id, elem) {
        const dest = document.querySelector(`#${id}`);
        dest.innerHTML = '';
        dest.insertAdjacentElement('afterbegin', elem);
    };

    init() {
        const el = this.makeList();
        this.placeElem('showLS', el)
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