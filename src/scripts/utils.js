function table(args) {
    return console.table.call(this, args)
}

function getCorrectorUser(user) {
    const [user1, user2] = ['Паша', "Катя"]
    const result = (user === user1) ? user2 : user1;
    return result
}

const dateReverse = (value) => Array.from(value).join('').split('-').reverse().join('-');


/**@returns data,options  saved at localStorage */
function loadLastInputsFromLS() {
    const saved = JSON.parse(localStorage.getItem('lastInputs') || '{}');
    const {
        data,
        options
    } = saved
    return saved
}

function getActiveSessionFromLocalStorage() {
    return JSON.parse(localStorage.getItem('ActiveSessionBlocks') || '[]')
}

function restoreForm() {
    const {
        data
    } = loadLastInputsFromLS();
    const restoreElems = Array.from(document.querySelectorAll('[data-restore]'));
    restoreElems.map(element => {
        const key = element.dataset.restore;
        if (key === 'date') element.value = dateReverse(data[key])
        else element.value = data[key]
    })
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



function spylog(args) {
    return console.log.call(this, args)
}