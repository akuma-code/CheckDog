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
    const values = {};
    const elems = Array.from(document.querySelectorAll('[data-form-inp]'));
    elems.map(elem => {
        let inp = elem.dataset.formInp;
        // if (inp === 'date') elem.value = Date(elem.value)
        values[inp] = elem.value
    });
    return values
}

function getBlocks(id = '#out') {
    const out = document.querySelector(id);
    const blocks = out.querySelectorAll('div.out_block');
    const checked = {};
    const count = dogCounter(1)
    for (let block of blocks) {
        checked[count()] = block.dataset.checked || null
    }
    console.log({
        checked
    });

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