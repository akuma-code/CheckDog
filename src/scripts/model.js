class UIVals {
    constructor() {
        this.update
    }

    get newValues() {
        /**данные для блока данных */
        const form = {
            checkedID: {}
        };
        /**опции для блока данных */
        const options = {
            checked: [],
            status: {}

        };

        /**елементы с формы с тегом [data-form-inp] */
        const $formElements = Array.from(document.querySelectorAll('[data-get-input]')) || [];
        /**елементы с формы с тегом fieldset.form_options */
        const $optionsElements = Array.from(document.querySelector('fieldset.form_options').elements) || [];

        $formElements.forEach(elem => {
            let input = elem.dataset.getInput;
            if (elem.type == 'text') {
                form[input] = elem.value
            };
            if (elem.type == 'date') form[input] = dateReverse(elem.value);
            if (elem.name === 'manager') form[input] = elem.value
        });

        $optionsElements.forEach(elem => {
            (elem.name === 'color') ? form.checkedID[elem.id] = elem.checked:
                form.checkedID[elem.name] = elem.checked
            if (elem.checked) options.checked.push(elem.labels[0].textContent)
        });
        return {
            data: form,
            id: form.id,
            options: options
        }
    };

    get update() {
        return this.newValues
    }
}

const _data = new UIVals

/** Базовый Блок */
class Block {
    constructor(formInp = {}) {
        this.data = formInp.data;
        this.options = formInp.options;
        // this.options.status = formInp
        this.blocktype = 'none'
    }

    toHTML() {
        return `Block.toHTML not defined!!`
    }
}
/**подБлок с данными */
class Outblock_data extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_inputs'
    }

    toHTML() {
        return `<fieldset data-form-name='data'>
<legend>
<span data-block-data='name'># ${this.data.bIndex+1 || 'NEW'}) ${this.data.name ||''}</span>
<span>ведет:</span>
<span data-block-data='manager'>${this.data.manager || ''}</span></legend>
<span data-block-data='id'>${this.data.id || ''}</span>
<span data-block-data='summ'>${this.data.summ || ''}</span><span>руб.</span>
<span data-block-data='date'>${this.data.date || ''}</span>
</fieldset> 
`
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_data');
        div.innerHTML = content;
        return div
    }
};
/**подБлок с опциями */
class Outblock_options extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_options'
    };

    toHTML() {
        let list = '';
        this.options.checked.map(elem => list += `<div class='block_options__elem'">${elem}</div>`)
        return list
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_options');

        div.innerHTML = content;


        return div
    }
}
/**подБлок контроля */
class Outblock_control {
    constructor(data) {
        // super(data)
        this.data = data
        this.master = this.data.manager
        this.observer = getCorrectorUser(this.master) || ''
            // this.blocktype = 'block_control';
    }

    toHTML() {
        const state = this.data.options.status
        const {
            prov,
            correct,
            disp
        } = state;

        const checkblock = (
            prov = false,
            correct = false,
            disp = false
        ) => `<fieldset>
                        <form data-form-name='control'>
                            <input type='checkbox' name="prov" data-check='prov' ${(prov) ? 'checked' : ''}></input>
                            <label for="prov">проверка</label>

                            <input type='checkbox' name="correct" data-check='correct' ${(correct) ? 'checked' : ''}></input>
                            <label for="correct">корректировка</label>

                            <input type='checkbox' name="disp" data-check='disp' ${(disp) ? 'checked' : ''}></input>
                            <label for="disp">диспетчерская</label>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend><span>Контроль:</span> <span data-getvalue="control">${this.observer}</span></legend>
                    </fieldset>`;

        return checkblock(
            prov,
            correct,
            disp
        )
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_control');
        div.innerHTML += content;
        return div


    }

}
class BlockPreview {

    makeDiv(block) {
        const div = document.createElement('div');
        div.classList.add('block_preview');
        div.insertAdjacentHTML = block || '';
        return div
    }

    render(elem = '') {
        const $output = document.querySelector('#preview');
        $output.innerHTML = '';
        $output.insertAdjacentElement('beforeend', elem)


    }
}




class BlockDataBase {
    constructor() {
        this.pool = [];
        this.pool.length = 0
            // this.loadPool()
    }

    add(block) {
        this.pool.push(block)
            // block.data.bIndex = this.pool.indexOf(block);

        console.log('added', block, 'pool size:', this.pool.length);

        return block
    }

    get clear() {
        // localStorage.removeItem('savedblocks')
        return this.pool.length = 0
    }
    get saveQuit() {
        // const getSavedDogs = JSON.parse(localStorage.getItem('savedblocks')) || [];
        // getSavedDogs.push(this.pool);
        this.pool.map((elem, index) => {
            elem.data.bIndex = index
        })
        localStorage.setItem('savedblocks', JSON.stringify(this.pool))
        this.pool.length = 0
    };

    get fastSave() {
        return localStorage.setItem('savedblocks', JSON.stringify(this.pool))
    }
    get load() {
        const saved = JSON.parse(localStorage.getItem('savedblocks')) || [];
        return saved
    }
    loadPool() {
        const pool = this.load
        if (pool.length == 0) console.log('All dogs was killed...');

        function outblock(block) {
            const blockD = new OutBlockBuilder().makeOutBlock(block)
            return document.querySelector('#out').insertAdjacentElement("beforeend", blockD)
        };

        pool.map(item => outblock(item))
        this.pool = pool
        return
    }

    getIdIndex(searchItem) {
        return this.pool.findIndex(item => searchItem === item.data.id)
    }

    findIndex(index) {
        return this.pool[index]
    }

    remove(blockID) {
        const temp = [];
        const removeIndex = this.getIdIndex(blockID);
        this.pool.forEach((item, index) => {
            if (index !== removeIndex) temp.push(item)
            else {
                console.log('removed: ', item)
                item = null
            }
        });
        this.pool.length = 0;
        this.pool = temp;
        return this.pool
    }
}


class OutBlockBuilder {
    constructor() {
        this.makeOutBlock
    }

    makeOutBlock(block) {
        const elem = document.createElement('div');
        const control = new Outblock_control(block).block;
        const optionsblock = new Outblock_options(block).block;
        const datablock = new Outblock_data(block).block;
        const status = block.options.status || {};

        elem.classList.add('out_block');
        elem.oncontextmenu = (event) => {
            if (event.altKey) elem.remove()
            if (event.ctrlKey) {
                event.currentTarget.remove()
                bdb.remove(block.data.id)
            }

        };

        elem.addEventListener('click', event => {
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
                // data.options.status[event.target.name] = (event.target.checked) ? true : false
                block.options.status = status
                    // console.log(block.options.status); 
            }
            // elem.setAttribute('status', JSON.stringify(status));
            bdb.fastSave

        }, true);

        [datablock, optionsblock, control].forEach(item => elem.insertAdjacentElement('beforeend', item))
            // elem.insertAdjacentElement('afterbegin', control);
            // elem.insertAdjacentElement('afterbegin', optionsblock);
            // elem.insertAdjacentElement('afterbegin', datablock);
        return elem
    }
};

function getDogsStatus() {
    const $out = document.querySelector('#out');
    const elems = Array.from($out.querySelectorAll('[status]'))
        // spylog(elems)
        // elems.forEach()
}

const bdb = new BlockDataBase();