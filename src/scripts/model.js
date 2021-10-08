function isDone(elemID) {
    const block = document.querySelector(`${elemID}`);
    const btn = block.querySelector('input[type=button]');
    const ch_boxes = block.querySelectorAll(`input[type=checkbox]`);
    let result = [];
    for (let cb of ch_boxes) {
        result.push(cb.checked)
    }

    if (result.includes(false)) return btn.disabled = true
    else return btn.disabled = false
}

function isDoneEv(event) {

}