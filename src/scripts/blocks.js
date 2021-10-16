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