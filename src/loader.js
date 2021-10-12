function b_data(uInputs = {}) {

    const {
        name,
        id,
        date,
        summ
    } = uInputs;

    const fieldset = `
    <fieldset data-form-name='data'>
<legend data-getvalue='name'>${name}</legend>
<span data-getvalue='id'>${id}</span>
<span data-getvalue='summ'>${summ} руб.</span>
</fieldset > 
<span data-getvalue='date'>${date}</span>
`;

    const elem = document.createElement('div');
    elem.classList.add('block_data');
    elem.insertAdjacentHTML('afterbegin', fieldset);
    return elem
};

function b_check() {
    const fieldset = `<fieldset>
                        <form data-form-name='control'>
                            <label for="prov">проверка</label>
                            <input type='checkbox' name="prov" data-getvalue='prov'></input>

                            <label for="correct">корректировка</label>
                            <input type='checkbox' name="correct" data-getvalue='correct'></input>

                            <label for="disp">диспетчерская</label>
                            <input type='checkbox' name="disp"></input>

                            <input type="button" value="DONE!" disabled>
                        </form>
                        <legend>Контроль</legend>
                    </fieldset>`
    const block = document.createElement('div');
    block.classList.add('block_check');
    block.insertAdjacentHTML('afterbegin', fieldset)
    return block
}