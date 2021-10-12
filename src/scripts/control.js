//@ts-check
const addbtn = document.querySelector('#addbtn'),
    elTypeForm = document.querySelector('fieldset.form_type');
//@ts-ignore
addbtn.addEventListener('click', (event = {}) => {
    const data = getVals();
    const block = new OutBlock(data);
    ls.add2LS(data);
    new LSBlock();

    return block.toHTML
});

window.addEventListener('keydown', event => {
    if (event.ctrlKey && event.altKey && event.key === 'e') {
        ls.clearDogs();
        new LSBlock();
        alert('Dogs cleared!')
    }
})


window.addEventListener('beforeunload', () => {
    ls.addActive2LS()
    localStorage.setItem('dogs', JSON.stringify(getActiveDogs()))
});

window.addEventListener('load', () => ls.init())

function getDogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('dogs') || '[]')
}

function getFormFromLocalStorage() {
    return JSON.parse(localStorage.getItem('form') || '[]')
}

function getActiveDogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('activeDogs') || '[]')
}

function setOutHTML() {
    const out = document.querySelector('#out');
    const html = out.innerHTML;
    localStorage.setItem('outhtml', html)
}

function getOutHTML() {
    return localStorage.getItem('outhtml') || '';
}

class LS {
    init() {
        this.loadForm();
        this.loadDogs();
        // this.loadActiveDogs();
        new LSBlock();
    };

    add2LS(data) {
        const saved = getDogsFromLocalStorage();
        saved.push(data);
        localStorage.setItem('dogs', JSON.stringify(saved));
        localStorage.setItem('form', JSON.stringify(data));

    }
    addActive2LS() {
        const active = getActiveDogs();
        localStorage.setItem('activeDogs', JSON.stringify(active))
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
    loadActiveDogs() {
        const activeD = getActiveDogsFromLocalStorage() || [];
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