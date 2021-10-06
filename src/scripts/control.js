//@ts-check
const addbtn = document.querySelector('#addbtn');

addbtn.addEventListener('click', (event) => {
    const target = event.target;
    const data = getVals();
    const block = new OutBlock(data);
    ls.add2LS()
        // ctrl_del(event)
    return block.toHTML
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
    }
    add2LS() {
        const all = getDogsFromLocalStorage();
        all.push(getVals());
        localStorage.setItem('dogs', JSON.stringify(all))
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