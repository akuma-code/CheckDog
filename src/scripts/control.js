const $ADDbtn = document.querySelector('#addbtn'),
    $out = document.querySelector('#out');

//@ts-ignore
$ADDbtn.addEventListener('click', () => {
    const newValues = new UIVals()
    const newBlock = (block) => new OutBlockBuilder().makeOutBlock(block);
    bdb.add(newValues)
    bdb.quickSave;

    localStorage.setItem('lastInputs', JSON.stringify(newValues))
    document.querySelector('#out').insertAdjacentElement("beforeend", newBlock(newValues))
    document.querySelector('#psize').innerHTML = `: ${bdb.pool.length}`
});


window.addEventListener('keydown', event => {
    if (event.ctrlKey && event.altKey && event.key === 'e') {
        let quest = confirm('Очистить данные?');

        if (quest) bdb.clear
        document.querySelector('#out').innerHTML = ''

    }

    if (event.ctrlKey && event.altKey && event.key === 'r') {
        event.preventDefault()
        table(bdb.pool)
    }
})


window.addEventListener('beforeunload', () => {

    bdb.saveQuit

});

window.addEventListener('load', () => {
    restoreForm();
    bdb.loadPool();
    document.querySelector('#psize').innerHTML = `: ${bdb.pool.length}`
    document.querySelector('#today').insertAdjacentText('afterbegin', `${getToday()}`);
    document.querySelector('#today').insertAdjacentText('beforebegin', `СЕГОДНЯ:`);
    console.log('dogs in da house:', bdb.pool.length);

})