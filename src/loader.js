function b_data(uInputs = {}) {

    const {
        name,
        id,
        date,
        summ
    } = uInputs;

    const fieldset = `
    <fieldset data-form-name='data'>
<legend data-getvalue='name'>${name}</legend>
<span data-getvalue='id'>${id}</span>
<span data-getvalue='summ'>${summ} руб.</span>
</fieldset > 
<span data-getvalue='date'>${date}</span>
`;

    const elem = document.createElement('div');
    elem.classList.add('block_data');
    elem.insertAdjacentHTML('afterbegin', fieldset);
    return elem
};

function b_check() {
    const fieldset = `<fieldset>
                        <form data-form-name='control'>
                            <label for="prov">проверка</label>
                            <input type='checkbox' name="prov" data-getvalue='prov'></input>

                            <label for="correct">корректировка</label>
                            <input type='checkbox' name="correct" data-getvalue='correct'></input>

                            <label for="disp">диспетчерская</label>
                            <input type='checkbox' name="disp"></input>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend>Контроль</legend>
                    </fieldset>`
    const block = document.createElement('div');
    block.classList.add('block_check');
    block.insertAdjacentHTML('afterbegin', fieldset)
    return block
}

class OutBlock {
    constructor(data) {
        this.content = data
    }

    get toHTML() {
        return document.querySelector('#out').insertAdjacentElement('beforeend', this.makeBlock(this.content))
    }

    makeBlock(values) {
        const elem = document.createElement('div');
        const data_block = new SubBlock_data(values).createElement();
        const control_block = new SubBlock_control(values).createElement();
        const options_block = new SubBlock_options(values).createElement();

        elem.classList.add('out_block');
        // elem.dataset.checked = '';

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
                updateActiveSessionBlocks()
            };
            isDone(form);
            if (event.target.matches('input[type=checkbox]')) {
                checked[event.target.name] = (event.target.checked) ? true : false
                event.target.closest('div.block_check').dataset.checked = JSON.stringify(checked)
            }

        }, true)
        elem.insertAdjacentElement('afterbegin', options_block)
        elem.insertAdjacentElement('afterbegin', data_block);
        elem.insertAdjacentElement('beforeend', control_block);

        return elem
    }
}



function dogCounter(startNumber = 0) {
    let counter = startNumber;
    return function() {
        return counter++
    }

}

function getVals() {
    const values = {
        options: {},
    };
    const elems = Array.from(document.querySelectorAll('[data-form-inp]'));
    const props = Array.from(document.querySelector('fieldset.form_options').elements) || [];
    props.map(elem => {
        if (elem.checked) {
            // values.options.push(elem.labels[0].textContent)
            //! пока отключу, чтобы хранилище не засирать переменными
            values.options[elem.name] = true
        }
    })
    elems.map(elem => {
        let inp = elem.dataset.formInp;
        values[inp] = elem.value
    });
    return values
}

function getOutputBlocks() {
    const output = document.getElementById('out');
    const divList = Array.from(output.getElementsByClassName('out_block'));

    let result = [];
    divList.map(elem => {
        // console.log(elem);
        result.push(getBlockVals(elem));

    });
    return result
}

function updateActiveSessionBlocks() {
    const active = getOutputBlocks();
    localStorage.setItem('ActiveSessionBlocks', JSON.stringify(active))
}

function getBlockVals(block = {}) {

    const blockDataValues = {};

    const checkboxes = Array.from(block.querySelectorAll('input[type=checkbox]')) || [];
    checkboxes.forEach(elem => {
        if (elem.checked) blockDataValues[elem.name] = true
    });

    const radio = Array.from(block.querySelectorAll('input[type=radio]')) || [];
    radio.forEach(elem => {
        if (elem.checked) blockDataValues[elem.name] = true
    });

    const valueElems = Array.from(block.querySelectorAll('[data-getvalue]')) || [];
    for (let elem of valueElems) {

        const key = elem.dataset.getvalue;
        blockDataValues[key] = elem.textContent
    };
    // console.log(data);
    return blockDataValues
}

class LS {
    init() {
        this.loadForm();
        // this.loadDogs();
        // this.loadActiveDogs();
        new LSBlock();
    };

    add2LS(block) {
        const saved = getDogsFromLocalStorage();
        saved.push(block);
        localStorage.setItem('dogs', JSON.stringify(saved));
        localStorage.setItem('form', JSON.stringify(block));

    }
    addActive2LS() {
        const active = getOutputBlocks();
        localStorage.setItem('ActiveSessionBlocks', JSON.stringify(active))
    }
    loadForm() {
        const inputs = document.querySelectorAll('[data-form-inp]');
        const data = getFormFromLocalStorage();
        inputs.forEach(elem => {
            //@ts-ignore
            const key = elem.dataset.formInp;
            //@ts-ignore
            elem.value = data[key] || ''
        })
    };
    loadActiveBlocks() {
        const activeD = getActiveSessionFromLocalStorage() || [];
        activeD.map(block => {
            new OutBlock(block).toHTML
        })
    }
    loadDogs() {
        const dogs = getDogsFromLocalStorage() || [];
        dogs.map(( /** @type string */ item) => {
            new OutBlock(item).toHTML
        })
    };


    clearDogs() {
        document.querySelector('#out').innerHTML = '';
        localStorage.removeItem('dogs')
        return
    }
}

// const dh = new DogHouse();
const ls = new LS();
class LSBlock {
    constructor() {
        this.store = getDogsFromLocalStorage();

        this.init()
    }

    makeList() {
        const data = this.store;
        const ol = document.createElement('ol');
        let list = '';

        // data.forEach(elem => list += `<li>${JSON.stringify(elem)}</li>`)
        for (let item of data) {
            const {
                id,
                name
            } = item || null;
            list += `<li>${name||null} // ${id||null}</li>`
        }
        ol.insertAdjacentHTML('afterbegin', list);

        return ol
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



//!                                    data block
class SubBlock_data {
    constructor(options = {}) {
        this.props = options
    }


    createElement() {
        const elem = document.createElement('div');
        const {
            name,
            id,
            summ,
            date,
            manager,
        } = this.props;


        this.props.control = getCorrectorUser(manager);
        // this.options.date = time_ru
        const data_block = `
<fieldset data-form-name='data'>
<legend ><span data-getvalue='name'>${name}</span> ведет: <span data-getvalue='manager'>${manager || ''}</span></legend>
<span data-getvalue='id'>${id}</span>
<span data-getvalue='summ'>${summ}</span><span>руб.</span>
</fieldset > 
<span data-getvalue='date'>${date}</span>
`;
        elem.classList.add('block_data');
        elem.insertAdjacentHTML('afterbegin', data_block);
        return elem
    };
};

//!                                        control block
class SubBlock_control {
    constructor(options = {}) {
        this.props = options
    }

    createElement() {
        const elem = document.createElement('div');
        const {
            prov,
            correct,
            disp,
            control,

        } = this.props;

        const subblock = {
            prov: `<input type='checkbox' name="prov" data-check='prov' ${(prov) ? 'checked' : ''}></input>`,

            correct: `<input type='checkbox' name="correct" data-check='correct' ${(correct) ? 'checked' :''}></input>`,

            disp: `<input type='checkbox' name="disp" data-check='disp' ${(disp) ? 'checked' :''}></input>`,
        };


        const block_control = `<fieldset>
                        <form data-form-name='control'>
                            ${subblock.prov}
                            <label for="prov">проверка</label>

                            ${subblock.correct}
                            <label for="correct">корректировка</label>

                            ${subblock.disp}
                            <label for="disp">диспетчерская</label>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend><span>Контроль:</span> <span data-getvalue="control">${control}</span></legend>
                    </fieldset>`
        elem.classList.add('block_check');
        elem.insertAdjacentHTML('afterbegin', block_control)
        return elem
    }
};


//!                          options
class SubBlock_options {
    constructor(values = {}) {
        this.list = values.options || {}
    }

    createElement() {
        const options = Array.from(this.list)
        let div = ''
        const elem = document.createElement('div');

        options.map(property => div += `<div>${property}</div>`);

        elem.classList.add('block_options');
        elem.innerHTML = `<fieldset data-form-name="options">
        <legend>Опции</legend>
        ${div}
        </fieldset>`;
        return elem
    }
}

class OutputContainer {
    constructor() {
            this.out = document.querySelector('#out');
            this.blockPool = [];
            this.blockPool.length = 0;
        }
        /**добавляет блок в контейнер */
    addBlock(outBlock) {
        this.blockPool.push(outBlock);
        console.log('added', outBlock, 'size', this.blockPool.length);
    }

    toOUT() {
        this.blockPool.forEach(block => block.toHTML)
    }
    saveContainerToLS() {
        localStorage.setItem('savedBlocks', JSON.stringify(...this.blockPool))
    }
    loadContainer() {
        const saved = JSON.parse(localStorage.getItem('savedBlocks')) || [];
        if (saved.length > 0) {
            this.blockPool.push(saved)
        } else {
            console.log('в локальном хранилище пусто!');
            // this.blockPool = []
        }
    }
}

const OC = new OutputContainer;

class BlockMaker extends BlockDog {
    constructor() {

    }

    OutBlock(block) {
        const blockDIV = document.createElement('div');
        blockDIV.classList.add('out_block');

        blockDIV.oncontextmenu = event => this.rClickHandler(event)

        blockDIV.addEventListener('click', event => this.clickHandler(event), true)

        const out = new BlockDog(block).blocks
        out.forEach(item => blockDIV.insertAdjacentElement('beforeend', item))

        return blockDIV
    };

    rClickHandler(event = Event) {
        if (event.altKey) event.currentTarget.remove()
        if (event.ctrlKey) {
            event.currentTarget.remove()
            this.remove(this.data.id)
        }
    };

    clickHandler(event = Event) {
        const status = this.data.options.status
        const currentTarget = event.currentTarget;
        const control_bl = currentTarget.querySelector('[data-form-name=control]');
        const blockbtn = currentTarget.querySelector('input[type=button]');
        isDone(control_bl);

        blockbtn.onclick = () => {
            currentTarget.remove();
            bdb.remove(block.data.id)
        };

        //! check control status
        if (event.target.matches('input[type=checkbox]')) {
            status[event.target.name] = (event.target.checked) ? true : false;
            this.data.options.status = status
        }
        bdb.fastSave
    }
};

const testdog = bdb.pool