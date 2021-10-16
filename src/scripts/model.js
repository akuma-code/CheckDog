function getChecked(selector) {
    const $elems = [].push(...document.querySelectorAll(`${selector}`));
    const items = $elems.forEach(item => {
        console.log(item.name);
    })
    return items

}

/**выдает данные с формы {data, options}
 */
function getFormDataInputs() {
    /**данные для блока данных */
    const form = {};
    /**опции для блока данных */
    const options = {
        checked: [],
        checkedID: {}
    };
    /**елементы с формы с тегом [data-form-inp] */
    const $formElements = Array.from(document.querySelectorAll('[data-form-inp]')) || [];
    /**елементы с формы с тегом fieldset.form_options */
    const $optionsElements = Array.from(document.querySelector('fieldset.form_options').elements) || [];



    $optionsElements.forEach(elem => {
        options.checkedID[elem.name] = elem.checked;
        if (elem.checked) {
            options.checked.push(elem.labels[0].textContent)
        }
    })
    $formElements.forEach(elem => {
        let input = elem.dataset.formInp;
        form[input] = elem.value
    });
    return { data: form, options: options }
}



class Block {
    constructor(formInp = {}) {
        this.data = formInp.data || {};
        this.options = formInp.options || {};
    }

    blocktype = false
    HTMLblock() {
        return `Block to HTML not defined!!`
    }
}

class subData extends Block {
    constructor(data, options) {
        super(data, options)
        this.blocktype = 'form_inputs'
    }

    HTMLblock() {
        return `<fieldset data-form-name='data'>
<legend ><span data-block-data='name' >${this.data.name ||''}</span> ведет: <span data-block-data='manager'>${this.data.manager || ''}</span></legend>
<span data-block-data='id'>${this.data.id || ''}</span>
<span data-block-data='summ'>${this.data.summ || ''}</span><span>руб.</span>
</fieldset > 
<span data-block-data='date'>${this.data.date || ''}</span>`
    }
}

class BlockPreview {
    constructor(block) {
        this.makeDiv(block)
        this.render(block)
    }

    makeDiv(block) {
        const div = document.createElement('div');
        div.classList.add('.block_preview');
        div.insertAdjacentHTML = block || '';
        return div
    }

    render(block, selector = '#preview') {
        const $output = document.querySelector(selector);
        $output.innerHTML = '';
        $output.insertAdjacentElement('afterbegin', this.makeDiv(block))

    }
}

const bp = new BlockPreview(new subData(getFormDataInputs()))