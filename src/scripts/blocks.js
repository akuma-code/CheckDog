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
    options: function(options = {}) {
        const { checked = [] } = options;
        let divlist = '';
        checked.map(elem => divlist += `<div class='block_options__elem'">${elem}</div>`);
        return divlist
    }
};

function getBlockTemplate(type) {
    return blockTemplate[type]
}