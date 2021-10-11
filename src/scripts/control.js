//@ts-check
const addbtn = document.querySelector('#addbtn'),
    elTypeForm = document.querySelector('fieldset.form_type');
//@ts-ignore
addbtn.addEventListener('click', (event = {}) => {
    const target = event.target;
    const data = getVals();
    const block = new OutBlock(data);
    ls.add2LS();
    new LSBlock();

    return block.toHTML
});

window.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.altKey) {
        ls.clearDogs();
        new LSBlock();
        alert('Dogs cleared!')
    }
})



window.addEventListener('load', () => ls.init())

function getDogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('dogs') || '[]')
}

function getFormFromLocalStorage() {
    return JSON.parse(localStorage.getItem('form') || '[]')
}

class LS {
    init() {
        this.loadForm();
        this.loadDogs();
        new LSBlock();
    }
    add2LS() {
        const saved = getDogsFromLocalStorage();
        saved.push(getVals());
        localStorage.setItem('dogs', JSON.stringify(saved));
        localStorage.setItem('form', JSON.stringify(getVals()));
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

    loadDogs() {
        const dogs = getDogsFromLocalStorage() || [];
        dogs.map(( /** @type string */ item) => {
            new OutBlock(item).toHTML
        })

    }
    clearDogs() {
        return localStorage.removeItem('dogs')
    }
}

// const dh = new DogHouse();
const ls = new LS();