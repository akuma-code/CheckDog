const dateReverse = (value) => Array.from(value).join('').split('-').reverse().join('.');
const dateBackReverse = (value) => Array.from(value).join('').split('.').reverse().join('-');
const optionsTimings = {
    'белый': 8,
    "цветной": 14,
    "спектраль": 21,
    "кристаллит": 14,
    "арки": 18,
    "закалка": 30,
    "двери": 12,
    "переплет": 14,
}

function getDeadline(options = []) {

    const getMax = (array) => array.sort(((a, b) => b - a))[0]
    const test = ['цветной', "арки", "закалка"]

    function sortOPT(arr = []) {
        const result = [];
        arr.map(item => {
            const time = optionsTimings[item];
            const name = item;
            result.push({
                name,
                time
            });
        })
        return result.sort((a, b) => b.time - a.time)
    }
    // spylog(sortOPT(test)[0].name)
    return sortOPT(options)
}

function getDeadLineDate(readydate = String, maxTime = Number) {
    const parsedtime = (date) => Array.from(date).join('').split('.').reverse();
    const [year, months, day] = parsedtime(readydate);
    const deadline = [+year, +months - 1, +day - maxTime];
    const dl = new Date(...deadline);
    const DYear = dl.getFullYear();
    const DMonth = dl.getMonth() + 1;
    const Dday = dl.getDate();
    return `${Dday}.${DMonth}.${DYear}`
}

function warningDeadline(block = UIVals) {
    const readyDate = block.data.date;
    const dl = dateBackReverse(block.data.deadlineDate);
    const today = dateBackReverse(getToday());
    const compare = (now, time) => {
        const datenow = new Date(Date.parse(now));
        const datetime = new Date(Date.parse(time));
        spylog(`now>time: ${datenow>datetime}`)
            // spylog(`now<=time: ${datenow<=datetime}`)
            // spylog(`now===time: ${datenow==datetime}`)
        return now > time
    }
    spylog({ today, dl })
    return compare(today, dl)
}
class UIVals {
    constructor() {
        this.data = this.update().data
        this.options = this.update().options
        this.id = this.data.id
    }

    newValues() {
        const form = {
            checkedID: {},
            props: [],
            obs: '',
            id: '',
            date: '',
            deadlineDate: ''
        };
        const options = {
            checked: [],
            status: {}

        };

        const $formElements = Array.from(document.querySelectorAll('[data-get-input]')) || [];
        const $optionsElements = Array.from(document.querySelector('fieldset.form_options').elements) || [];
        const $propsElements = Array.from(document.querySelectorAll('[data-prop]')) || [];

        $formElements.forEach(elem => {
            let input = elem.dataset.getInput;
            if (elem.type == 'text') {
                form[input] = elem.value
            };
            if (elem.type == 'date') {
                form[input] = dateReverse(elem.value);
            };
            if (elem.name === 'master') {
                form[input] = elem.value;
                form.obs = getCorrectorUser(elem.value)
            }
        });

        $optionsElements.forEach(elem => {
            (elem.name === 'color') ? form.checkedID[elem.id] = elem.checked:
                form.checkedID[elem.name] = elem.checked
            if (elem.checked) options.checked.push(elem.labels[0].textContent)
        });

        $propsElements.forEach(elem => {
            if (elem.checked) form.props.push(elem.labels[0].textContent)
        })

        return {
            data: form,
            id: form.id,
            options: options
        }
    };

    update() {
        const result = this.newValues()
        return result
    }
}

const _data = new UIVals()

function table(args) {
    return console.table.call(this, args)
}

function getCorrectorUser(user) {
    const [user1, user2] = ['Паша', "Катя"]
    const result = (user === user1) ? user2 : user1;
    return result
}



/**@returns data,options  saved at localStorage */
function loadLastInputsFromLS() {
    const saved = JSON.parse(localStorage.getItem('lastInputs') || '{}');

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
        if (key === 'date') element.value = dateBackReverse(data[key])
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

function getToday() {
    const date = new Date();

    let day = date.getDate();
    if (day.toString().length === 1) day = '0' + date.getDate()
    let month = date.getMonth();

    if (month.toString().length === 1) month = '0' + date.getMonth()
    let year = date.getFullYear();

    const today = `${day}.${+month+1}.${year}`;
    return today
}

function spylog(args) {
    return console.log.call(this, args)
}