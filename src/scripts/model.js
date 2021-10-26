const blockTemplate = {
    data: function(dogdata = Block) {
        const {
            bIndex,
            name,
            master,
            id,
            summ,
            date
        } = dogdata;
        return `<fieldset data-form-name='data'>
<legend>
<span data-block-data='name'>#${bIndex+1 || 'NEW'}) ${name ||''}</span>
<span>ведет:</span>
<span data-block-data='master'>${master || ''}</span></legend>
<span data-block-data='id'>${id || ''}</span>
<span data-block-data='summ'>${summ || ''}</span><span>руб.</span>
<span data-block-data='date'>${date || ''}</span>
</fieldset> 
`
    },
    options: function(checked = []) {
        if (!checked.length) return ``
        let list = '';
        const times = getDeadline(checked)
        const max = times[0].name
        checked.map(elem => {
            if (elem === max) list += `<div class='block_options__elem maxdl' ">${elem}</div>`
            else list += `<div class='block_options__elem'">${elem}</div>`
        })
        return list
    },
    control: function({
        prov = false,
        correct = false,
        disp = false,
        obs = ''
    }) {
        return `
        <fieldset>
            <form data-form-name='control'>
                <input type='checkbox' name="prov" data-check='prov' ${(prov) ? 'checked' : ''}></input>
                <label for="prov">проверка</label>
                <input type='checkbox' name="correct" data-check='correct' ${(correct) ? 'checked' : ''}></input>
                <label for="correct">корректировка</label>
                <input type='checkbox' name="disp" data-check='disp' ${(disp) ? 'checked' : ''}></input>
                <label for="disp">диспетчерская</label>
                <input type="button" value="DONE!" disabled>
            </form>
            <legend><span>Контроль:</span> <span data-getvalue="control">${obs}</span></legend>
        </fieldset>
`
    }
};

class BlockDog {
    constructor(data_block = Block) {
        this.data = data_block

    }
    blocksHTML() {
        const blockValues = this.data
        const obs = blockValues.obs
        const {
            prov,
            correct,
            disp
        } = blockValues.options.status;
        const Bcontrol = blockTemplate.control({
            prov,
            correct,
            disp,
            obs
        })

        const Bdata = blockTemplate.data(blockValues)

        const Boptions = blockTemplate.options(blockValues.options.checked);
        const blocks = {
            data: Bdata,
            options: Boptions,
            control: Bcontrol
        };
        return blocks
    };

    blockDIV(type) {
        const classes = {
            control: `block_control`,
            options: `block_options`,
            data: `block_data`
        }
        const div = document.createElement('div');
        // const content = this.blocksHTML()
        div.classList.add(classes[type]);
        div.innerHTML = this.blocksHTML()[type];
        return div
    };

    get blocks() {
        const blocks = ['data', 'options', 'control'].map(item => this.blockDIV(item));
        return blocks

    }

};