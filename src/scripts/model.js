function getActiveDogs() {
    const output = document.getElementById('out');
    const divList = Array.from(output.getElementsByClassName('out_block'));
    let result = divList.forEach(elem => {
        // console.log(elem);
        getBlockVals(elem);

    })
}

function getBlockVals(block = 'div.block_data') {
    const name = block.querySelector('legend').textContent || '';
    const spans = Array.from(block.querySelectorAll('[data-getvalue]')) || [];
    const checkboxes = Array.from(block.querySelectorAll('input[type=checkbox]')) || [];

    const data = {
        checked: []
    };

    checkboxes.forEach(elem => {
        if (elem.checked) data.checked.push(elem.name)
    })
    for (let elem of spans) {
        const value = elem.dataset.getvalue;
        data[value] = elem.textContent
    };
    console.log(data);
    return data
}

function getControlBlockVals(block = 'div.block_check') {
    const checkboxes = Array.from(block.querySelectorAll('input[type=checkbox]')) || [];
    const control = [];
    checkboxes.forEach(elem => {
        if (elem.checked) control.push(elem.name)
    })
    return control
}