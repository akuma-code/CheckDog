function b_data(uInputs = {}) {

    const {
        name,
        id,
        date,
        summ
    } = uInputs;

    const fieldset = `
    <fieldset data-form-name='data'>
<legend>${name}</legend>
<span >${id}</span>
<span>${summ} руб.</span>
</fieldset > 
<span>${date}</span>
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
                            <input type='checkbox' name="prov"></input>

                            <label for="correct">корректировка</label>
                            <input type='checkbox' name="correct"></input>

                            <label for="disp">диспетчерская</label>
                            <input type='checkbox' name="disp"></input>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend '>Контроль</legend>
                    </fieldset>`
    const block = document.createElement('div');
    block.classList.add('block_check');
    block.insertAdjacentHTML('afterbegin', fieldset)
    return block
}

function getType() {
    const $form = document.querySelector('#Dogs_form');
    const radio = Array.from($form.elements.type);
    let result = '';
    radio.forEach(input => {
        if (input.checked) result = input.nextSibling.textContent
    });
    return result


}

function getVals() {
    const values = {};
    const elems = Array.from(document.querySelectorAll('[data-form-inp]'));
    elems.map(elem => {
        let inp = elem.dataset.formInp;
        values[inp] = elem.value
    });
    return values

}

function isDone(element) {
    const btn = element.querySelector('input[type=button]');
    const ch_boxes = element.querySelectorAll(`input[type=checkbox]`);
    let result = [];
    for (let cb of ch_boxes) {
        result.push(cb.checked)
    }
    if (result.includes(false)) {
        btn.disabled = true
        return false
    } else {
        btn.disabled = false
        return true
    }
}

const template_out = `
<div class="out_block">
<div class="block_data">
<fieldset>
<legend>Губин Иван Вячеславович</legend>
<span>21/10/04/02-21П</span>
<span>8 октября 2021</span>
<span>2645 руб</span>
</fieldset>
</div>
<div class="block_check">
<fieldset>
<legend>Контроль</legend>
<form>
<label for="prov">проверка</label>
<input type='checkbox' name="prov"></input>
<label for="correct">корректировка</label>
<input type='checkbox' name="correct"></input>
<label for="disp">диспетчерская</label>
<input type='checkbox' name="disp"></input>
<input type="button" value="DONE!" disabled>
</form>
</fieldset>
</div>
</div>`;


function makeElem(type, options = {}) {
    const elem = document.createElement('div');

    if (type === 'data') {
        const {
            name,
            id,
            date,
            summ
        } = options;
        const form = `
<fieldset>
<legend>${name}</legend>
<span>${id}</span>
<span>${date}</span>
<span>${summ} руб.</span>
</fieldset>
`
        elem.classList.add('block_data');
        elem.insertAdjacentHTML('afterbegin', form)
    }
    if (type === 'contol') {
        const controlHTML = `<fieldset>
                        <form name='control'>
                            <label for="prov">проверка</label>
                            <input type='checkbox' name="prov"></input>

                            <label for="correct">корректировка</label>
                            <input type='checkbox' name="correct"></input>

                            <label for="disp">диспетчерская</label>
                            <input type='checkbox' name="disp"></input>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend '>Контроль</legend>
                    </fieldset>`
        elem.classList.add('block_check');
        elem.insertAdjacentHTML('afterbegin', controlHTML)
    }

    return elem
}

function ctrl_del(event) {
    const target = event.target;
    const elem = event.currentTarget;
    let current = elem.value;
    if (event.ctrlKey && elem.id === 'addbtn') {
        elem.value = 'Удалить псов!';
        ls.clearDogs()
    }
    elem.value = current

}