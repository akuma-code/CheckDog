//@ts-check
const addbtn = document.querySelector('#addbtn'),
    elTypeForm = document.querySelector('fieldset.form_type');


//@ts-ignore
addbtn.addEventListener('click', () => {
    localStorage.setItem('lastInputs', JSON.stringify(getFormDataInputs()))
    const formInputs = getFormDataInputs();
    const block = new Outblock_data(formInputs);
    // const block = new OutBlock(formInputs);
    // OC.addBlock(block)
    // new LSBlock();
    // ls.addActive2LS();
    // ls.add2LS(formInputs);

    return
});

window.addEventListener('keydown', event => {
    if (event.ctrlKey && event.altKey && event.key === 'e') {
        let quest = confirm('Очистить данные?');

        if (quest) ls.clearDogs();

        new LSBlock();
    }

    if (event.ctrlKey && event.altKey && event.key === 'b') {

        const showLS = document.querySelector('#showLS');
        (showLS.classList.contains('elem_hide')) ? showLS.classList.remove('elem_hide'): showLS.classList.add('elem_hide')
    }
})


window.addEventListener('beforeunload', () => {
    localStorage.setItem('lastInputs', JSON.stringify(getFormDataInputs()))
        // ls.add2LS(getActiveSessionFromLocalStorage())
        // updateActiveSessionBlocks();

    // localStorage.setItem('dogs', JSON.stringify(getOutputBlocks()))
});

window.addEventListener('load', () => {
    restoreForm()
        // ls.init();
        // OC.loadContainer();
        // OC.toOUT();
})


class LS {
    init() {
        this.loadForm();
        this.loadDogs();
        // this.loadActiveDogs();
        new LSBlock();
    };

    add2LS(block) {
        const saved = getDogsFromLocalStorage();
        saved.push(block);
        localStorage.setItem('dogs', JSON.stringify(saved));
        localStorage.setItem('form', JSON.stringify(block));

    }
    addActive2LS() {
        const active = getOutputBlocks();
        localStorage.setItem('ActiveSessionBlocks', JSON.stringify(active))
    }
    loadForm() {
        const inputs = document.querySelectorAll('[data-form-inp]');
        const data = getFormFromLocalStorage();
        inputs.forEach(elem => {
            //@ts-ignore
            const key = elem.dataset.formInp;
            //@ts-ignore
            elem.value = data[key] || ''
        })
    };
    loadActiveBlocks() {
        const activeD = getActiveSessionFromLocalStorage() || [];
        activeD.map(block => {
            new OutBlock(block).toHTML
        })
    }
    loadDogs() {
        const dogs = getDogsFromLocalStorage() || [];
        dogs.map(( /** @type string */ item) => {
            new OutBlock(item).toHTML
        })
    };


    clearDogs() {
        document.querySelector('#out').innerHTML = '';
        localStorage.removeItem('dogs')
        return
    }
}

// const dh = new DogHouse();
const ls = new LS();