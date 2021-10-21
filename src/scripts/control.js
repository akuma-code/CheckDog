//@ts-check
const $ADDbtn = document.querySelector('#addbtn'),
    $out = document.querySelector('#out');

//@ts-ignore
$ADDbtn.addEventListener('click', () => {

    const newBlock = (block) => new OutBlockBuilder().makeOutBlock(block);
    const out = new OutBlockBuilder().makeOutBlock(new UIVals().update)
    bdb.add(new UIVals().update)
    bdb.fastSave;

    localStorage.setItem('lastInputs', JSON.stringify(_data.update))
    document.querySelector('#out').insertAdjacentElement("beforeend", newBlock(bdb.pool[bdb.pool.length - 1]))

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
    restoreForm()
    bdb.loadPool();
    console.log('dogs in da house:', bdb.pool.length);

})