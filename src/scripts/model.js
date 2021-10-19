//@ts-check
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

function getChecked(blockElement, type) {
    const elemsArr = Array.from(blockElement.children)

    const result = {};
    elemsArr.map(elem => {
        if (elem[type] === 'radio')
        // const dataset = elem.dataset;
        // const name = dataset[selector];
        // spylog(elem.dataset[selector])
        // result[name] = (elem.value) ? elem.value : null
            if (elem.checked) result[elem.name] = true
    });
    return result
}
class UIVals {
    constructor() {
        this.data = this.FormValues().data
        this.options = this.FormValues().options
    }

    FormValues() {
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

}

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

class Outblock_options extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_options'
    };

    toHTML() {
        let list = '';
        return this.options.checked.map(elem => list += `<div>${elem}</div>`)
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_options');
        div.innerHTML = content;
        return div
    }
}

class Outblock_control extends Block {
    constructor() {
        super()
        this.type = 'block_control'
    }

    toHTML() {
        const checkblock = `<fieldset>
                        <form data-form-name='control'>
                            <input type='checkbox' name="prov" data-check='prov'}></input>
                            <label for="prov">проверка</label>

                            <input type='checkbox' name="correct" data-check='correct' }></input>
                            <label for="correct">корректировка</label>

                            <input type='checkbox' name="disp" data-check='disp'}></input>
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
    constructor() {

    }

    static list = {
        data: Outblock_data,
        options: Outblock_options,
        control: Outblock_control
    }

    static OutputBlock = [this.list.data, this.list.options, this.list.control]


    get UIdata() {
        return getFormDataInputs()
    }



    create(type) {

    }


}

const factory = new BlockFactory();

const blocks = [
    factory.create('data'),
    factory.create('options'),
    factory.create('control'),
];

function makeBlock() {
    const elem = document.createElement('div');
    const [data_block, options_block, control_block] = blocks
    // const data_block = new Outblock_data(values).block
    // const control_block = new SubBlock_control(values).createElement();
    // const options_block = new SubBlock_options(values).createElement();

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