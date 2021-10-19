/**выдает данные с формы {data, options}
 */
function getFormDataInputs() {
    /**данные для блока данных */
    const form = {
        checkedID: {}
    };
    /**опции для блока данных */
    const options = {
        checked: [],

    };
    /**елементы с формы с тегом [data-form-inp] */
    const $formElements = Array.from(document.querySelectorAll('[data-get-input]')) || [];
    /**елементы с формы с тегом fieldset.form_options */
    const $optionsElements = Array.from(document.querySelector('fieldset.form_options').elements) || [];

    $formElements.forEach(elem => {
        let input = elem.dataset.getInput;
        if (elem.type == 'text' || elem.type == 'date') {
            form[input] = elem.value
        };
        if (elem.name === 'manager') form[input] = elem.value
    });

    $optionsElements.forEach(elem => {
        (elem.name === 'color') ? form.checkedID[elem.id] = elem.checked:
            form.checkedID[elem.name] = elem.checked
        if (elem.checked) options.checked.push(elem.labels[0].textContent)
    });


    // debugger
    return {
        data: form,
        options: options
    }
}


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

        };
        /**елементы с формы с тегом [data-form-inp] */
        const $formElements = Array.from(document.querySelectorAll('[data-get-input]')) || [];
        /**елементы с формы с тегом fieldset.form_options */
        const $optionsElements = Array.from(document.querySelector('fieldset.form_options').elements) || [];

        $formElements.forEach(elem => {
            let input = elem.dataset.getInput;
            if (elem.type == 'text' || elem.type == 'date') {
                form[input] = elem.value
            };
            if (elem.name === 'manager') form[input] = elem.value
        });

        $optionsElements.forEach(elem => {
            (elem.name === 'color') ? form.checkedID[elem.id] = elem.checked:
                form.checkedID[elem.name] = elem.checked
            if (elem.checked) options.checked.push(elem.labels[0].textContent)
        });
        return {
            data: form,
            options: options
        }
    };

    get update() {
        return this.newValues
    }
}

const _data = new UIVals()

/** Базовый Блок */
class Block {
    constructor(formInp = {}) {
        this.data = formInp.data || {};
        this.options = formInp.options || {};
    }

    blocktype = 'none'
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
<span data-block-data='name' >${this.data.name ||''}</span>
<span>ведет:</span>
<span data-block-data='manager'>${this.data.manager || ''}</span></legend>
<span data-block-data='id'>${this.data.id || ''}</span>
<span data-block-data='summ'>${this.data.summ || ''}</span><span>руб.</span>
</fieldset> 
<span data-block-data='date'>${this.data.date || ''}</span>`
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
        this.options.checked.map(elem => list += `<div>${elem}</div>`)
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
class Outblock_control extends Block {
    constructor() {
        super()
        this.blocktype = 'block_control'
    }

    toHTML() {
        const checkblock = `<fieldset>
                        <form data-form-name='control'>
                            <input type='checkbox' name="prov" data-check='prov'></input>
                            <label for="prov">проверка</label>

                            <input type='checkbox' name="correct" data-check='correct'></input>
                            <label for="correct">корректировка</label>

                            <input type='checkbox' name="disp" data-check='disp'></input>
                            <label for="disp">диспетчерская</label>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend><span>Контроль:</span> <span data-getvalue="control"></span></legend>
                    </fieldset>`;

        return checkblock
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_control');
        div.innerHTML = content;
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

const bp = new BlockPreview()

class BlockFactory {
    constructor() {}

    static list = {
        data: Outblock_data,
        options: Outblock_options,
        control: Outblock_control
    }

    get UIdata() {
        const {
            data,
            options
        } = getFormDataInputs()
        return {
            data,
            options
        }
    }

    create(type) {
        if (type === 'control') return new BlockFactory.list.control
        else return new BlockFactory.list[type](getFormDataInputs())
    }

}

class BlockDataBase {
    constructor() {
        this.pool = []
            // this.loadPool()
    }

    add(block) {
        console.log(block);
        this.pool.push(block)
        this.pool.length
        return
    }

    get clear() {
        // localStorage.removeItem('savedblocks')
        return this.pool.length = 0
    }
    get save() {
        const lsb = JSON.parse(localStorage.getItem('savedblocks')) || [];
        lsb.push(this.pool);
        localStorage.setItem('savedblocks', JSON.stringify(this.pool))
        this.clear
    }
    loadPool() {
        const lsb = JSON.parse(localStorage.getItem('savedblocks'));
        if (!localStorage.getItem('savedblocks')) return this.pool
        const out = (data) => new OutBlockBuilder(data)

        this.pool = lsb
        lsb.forEach(item => document.querySelector('#out').insertAdjacentElement("afterbegin", out(item).makeOutBlock()))
        return this.pool.length
    }

    findInd(searchItem) {
        return this.pool.findIndex(item => searchItem === item.data.id)
    }

    remove(blockID) {
        const temp = [];
        const removeIndex = this.findInd(blockID);
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



function makeBlock(blocks = []) {



    const elem = document.createElement('div');
    const [data_block, options_block, control_block] = blocks
    const checked = {};

    elem.classList.add('out_block');

    elem.oncontextmenu = (event) => {
        // event.preventDefault();
        if (event.altKey) elem.remove()
    };

    elem.addEventListener('click', event => {
        const currentTarget = event.currentTarget;
        const form = currentTarget.querySelector('form');
        const blockbtn = currentTarget.querySelector('input[type=button]');
        blockbtn.onclick = () => {
            currentTarget.remove();
            // updateActiveSessionBlocks()
        };
        isDone(form);
        if (event.target.matches('input[type=checkbox]')) {
            checked[event.target.name] = (event.target.checked) ? true : false
                // event.target.closest('div.block_check').dataset.checked = JSON.stringify(checked)
        }

    }, true)
    elem.insertAdjacentElement('afterbegin', options_block)
    elem.insertAdjacentElement('afterbegin', data_block);
    elem.insertAdjacentElement('beforeend', control_block);

    return elem
}

class OutBlockBuilder extends Block {
    constructor({ data, options }) {
        super(data, options)
    }
    static list = {
        data: Outblock_data,
        options: Outblock_options,
        control: Outblock_control
    }
    makeOutBlock() {
        const elem = document.createElement('div');
        const control = new Outblock_control().block;
        const options = new Outblock_options(_data.update).block;
        const datablock = new Outblock_data(_data.update).block;
        elem.classList.add('out_block');
        elem.oncontextmenu = (event) => {
            if (event.altKey) elem.remove()
        };
        elem.addEventListener('click', event => {
            const currentTarget = event.currentTarget;
            const form = currentTarget.querySelector('form');
            const blockbtn = currentTarget.querySelector('input[type=button]');
            blockbtn.onclick = () => {
                currentTarget.remove();
                // updateActiveSessionBlocks()
            };
            isDone(form);
            if (event.target.matches('input[type=checkbox]')) {
                this.options[event.target.name] = (event.target.checked) ? true : false
            }
        }, true);
        elem.insertAdjacentElement('afterbegin', control);
        elem.insertAdjacentElement('afterbegin', options);
        elem.insertAdjacentElement('afterbegin', datablock);
        return elem
    }
};

const bdb = new BlockDataBase();