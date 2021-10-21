const blockTemplate = {
    data: function(dogdata = {}) {
        const { bIndex, name, manager, id, summ, date } = dogdata;
        return `<fieldset data-form-name='data'>
<legend>
<span data-block-data='name'># ${bIndex+1 || 'NEW'}) ${name ||''}</span>
<span>ведет:</span>
<span data-block-data='manager'>${manager || ''}</span></legend>
<span data-block-data='id'>${id || ''}</span>
<span data-block-data='summ'>${summ || ''}</span><span>руб.</span>
<span data-block-data='date'>${date || ''}</span>
</fieldset> 
`
    },
    options: function(checked = []) {
        if (!checked.length) return ``
        let divlist = '';
        checked.map(elem => divlist += `<div class='block_options__elem'">${elem}</div>`);
        return divlist
    },
    control: function(prov = false, correct = false, disp = false, obs = '') {
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

function getBlockTemplate(type = '') {
    return blockTemplate[type]
}

const gbt = getBlockTemplate('options')