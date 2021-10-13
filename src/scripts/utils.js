function getCorrectorUser(user) {
    const [user1, user2] = ['Паша', "Катя"]
    const result = (user === user1) ? user2 : user1;
    return result

}

function dogCounter(startNumber = 0) {
    let counter = startNumber;
    return function() {
        return counter++
    }

}

function getVals() {
    const values = {
        options: [],
    };
    const elems = Array.from(document.querySelectorAll('[data-form-inp]'));
    const props = Array.from(document.querySelector('fieldset.form_options').elements) || [];
    props.map(elem => {
        if (elem.checked) {
            values.options.push(elem.labels[0].textContent)
                //! пока отключу, чтобы хранилище не засирать переменными
            values[elem.name] = true
        }
    })
    elems.map(elem => {
        let inp = elem.dataset.formInp;
        values[inp] = elem.value
    });
    return values
}

function getDogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('dogs') || '[]')
}

function getFormFromLocalStorage() {
    return JSON.parse(localStorage.getItem('form') || '[]')
}

function getActiveSessionFromLocalStorage() {
    return JSON.parse(localStorage.getItem('ActiveSessionBlocks') || '[]')
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