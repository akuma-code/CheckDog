class OutBlock {
    constructor(data = {}) {
        this.data = data;
    }

    get toHTML() {
        return document.querySelector('#out').insertAdjacentElement('beforeend', this.makeBlock(this.data))
    }

    makeBlock(values) {
        const elem = document.createElement('div');
        const data_block = new SubBlock_data(values).createElement();
        const control_block = new SubBlock_control(values).createElement();

        elem.classList.add('out_block');
        elem.dataset.checked = '';

        elem.oncontextmenu = (event) => {
            // event.preventDefault();
            if (event.altKey) elem.remove()
        };

        const checked = {};
        elem.addEventListener('click', event => {
            const target = event.currentTarget;
            const form = target.querySelector('form');
            const blockbtn = target.querySelector('input[type=button]');
            blockbtn.onclick = () => {
                target.remove();
                updateDogs()
            };
            isDone(form);
            if (event.target.matches('input[type=checkbox]')) {
                checked[event.target.name] = (event.target.checked) ? true : false
                event.target.closest('div.block_check').dataset.checked = JSON.stringify(checked)
            }

        }, true)

        elem.insertAdjacentElement('afterbegin', data_block);
        elem.insertAdjacentElement('beforeend', control_block);

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
};

function getActiveDogs() {
    const output = document.getElementById('out');
    const divList = Array.from(output.getElementsByClassName('out_block'));

    let result = [];
    divList.map(elem => {
        // console.log(elem);
        result.push(getBlockVals(elem));

    });
    return result
}

function updateDogs() {
    const active = getActiveDogs();
    localStorage.setItem('activeDogs', JSON.stringify(active))
}

function getBlockVals(block = {}) {

    const data = {};

    const checkboxes = Array.from(block.querySelectorAll('input[type=checkbox]')) || [];
    checkboxes.forEach(elem => {
        if (elem.checked) data[elem.name] = elem.checked
    });

    const valueElems = Array.from(block.querySelectorAll('[data-getvalue]')) || [];
    for (let elem of valueElems) {

        const key = elem.dataset.getvalue;
        data[key] = elem.textContent
    };
    // console.log(data);
    return data
}


//!                                    data block
class SubBlock_data {
    constructor(options = {}) {
        this.options = options
    }


    createElement() {
        const {
            name,
            id,
            summ,
            date,
            manager
        } = this.options;

        const data_block = `
<fieldset data-form-name='data'>
<legend ><span data-getvalue='name'>${name}</span> ведет: <span data-getvalue='manager'>${manager || ''}</span></legend>
<span data-getvalue='id'>${id}</span>
<span data-getvalue='summ'>${summ}</span><span>руб.</span>
</fieldset > 
<span data-getvalue='date'>${date}</span>
`;
        const elem = document.createElement('div');
        elem.classList.add('block_data');
        elem.insertAdjacentHTML('afterbegin', data_block);
        return elem
    };
};

//!                                        control block
class SubBlock_control {
    constructor(options = {}) {
        this.options = options
    }

    createElement() {
        const {
            prov,
            correct,
            disp,
            controller
        } = this.options;

        const subblock = {
            prov: `<input type='checkbox' name="prov" data-check='prov' ${(prov)?'checked':null}></input>`,

            correct: `<input type='checkbox' name="correct" data-check='correct' ${(correct)?'checked':null}></input>`,

            disp: `<input type='checkbox' name="disp" data-check='disp' ${(disp)?'checked':null}></input>`,
        }
        const block_control = `<fieldset>
                        <form data-form-name='control'>
                            <label for="prov">проверка</label>
                            ${subblock.prov}

                            <label for="correct">корректировка</label>
                            ${subblock.correct}

                            <label for="disp">диспетчерская</label>
                            ${subblock.disp}

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend>Контроль</legend>
                    </fieldset>`
        const elem = document.createElement('div');
        elem.classList.add('block_check');
        elem.insertAdjacentHTML('afterbegin', block_control)
        return elem
    }

}