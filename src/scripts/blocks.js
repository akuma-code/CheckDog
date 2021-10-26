/*
 * TODO: перенести блоки в блокс.жс 
 * TODO: очистка инпута по правой кнопке и при добавлении
 */


class DogItem {
    constructor(content = null) {
        this.update(content)
    }
    data = {
        bIndex: 0,
        checkedID: {},
        date: '',
        id: '',
        master: '',
        name: '',
        obs: '',
        summ: 0
    };
    options = {
        checked: [],
        status: {}
    };

    update(content) {
        if (!content) return
        this.data = content.data;
        this.options = content.options;
        this.id = this.data.id
    }

}

class Block {
    constructor(formInp = DogItem) {
        this.data = formInp.data;
        this.options = formInp.options;
        this.blocktype = 'none'
    }

    toHTML() {
        return `Block.toHTML not defined!!`
    }

    get block() {
        let cls = '';
        const div = document.createElement('div');
        const content = this.toHTML()
        div.innerHTML = content;
        if (this.blocktype === 'form_inputs') {
            cls = 'block_data';
            div.classList.add(cls);
        };
        if (this.blocktype === 'form_options') {
            cls = 'block_options';
            div.classList.add(cls);

        };
        return div
    }
}


class BlockDataBase {
    constructor() {
        this.pool = [];
        this.pool.length = 0
    }

    add(block) {
        this.pool.push(new DogItem(block))

        console.log('added', block, 'pool size:', this.pool.length);

        return block
    }

    get clear() {
        return this.pool.length = 0
    }
    get saveQuit() {

        this.pool.map((elem, index) => {
            elem.data.bIndex = index
        })
        localStorage.setItem('savedblocks', JSON.stringify(this.pool))
        this.pool.length = 0
    };

    get quickSave() {
        return localStorage.setItem('savedblocks', JSON.stringify(this.pool))
    }
    get load() {
        const saved = JSON.parse(localStorage.getItem('savedblocks')) || [];
        return saved
    }
    loadPool() {
        const pool = this.load
        if (pool.length == 0) console.log('All dogs was killed...');

        function outblock(block) {
            const blockD = new OutBlockBuilder().makeOutBlock(block)
            return document.querySelector('#out').insertAdjacentElement("beforeend", blockD)
        };

        pool.map(item => outblock(item))
        this.pool = pool
        return
    }

    getIdIndex(searchItem) {
        return this.pool.findIndex(item => searchItem === item.data.id)
    }

    findIndex(index) {
        return this.pool[index]
    }

    remove(blockID) {
        const temp = [];
        const removeIndex = this.getIdIndex(blockID);
        this.pool.forEach((item, index) => {
            if (index !== removeIndex) temp.push(item)
            else {
                console.log('removed: ', item.id)
                item = null
            }
        });
        this.pool.length = 0;
        this.pool = temp;
        return this.pool
    }
}


/**подБлок с данными */
class Outblock_data extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_inputs'
    }

    toHTML() {
        return `<fieldset data-form-name='data'>
<legend>
<span data-block-data='name'>#${this.data.bIndex+1 || 'NEW'}) ${this.data.name ||''}</span>
<span>ведет:</span>
<span data-block-data='master'>${this.data.master || ''}</span></legend>
<span data-block-data='id'>${this.data.id || ''}</span>
<span data-block-data='summ'>${this.data.summ || ''}</span><span>руб.</span>
<span data-block-data='date'>${this.data.date || ''}</span>
</fieldset> 
`
    }

};
/**подБлок с опциями */
class Outblock_options extends Block {
    constructor(data) {
        super(data)
        this.blocktype = 'form_options'
    };

    toHTML() {
        let list = '';
        const times = getDeadline(this.options.checked)
        const max = times[0].name
        this.options.checked.map(elem => {
            if (elem === max) list += `<div class='block_options__elem maxdl' ">${elem}</div>`
            else list += `<div class='block_options__elem'">${elem}</div>`
        })
        return list
    }

}
/**подБлок контроля */
class Outblock_control {
    constructor(data) {
        this.data = data
        this.observer = getCorrectorUser(this.data.master) || ''
    }

    toHTML() {
        const state = this.data.options.status
        const obs = this.data.data.obs
        const {
            prov,
            correct,
            disp
        } = state;
        const checkblock = (
            prov = false,
            correct = false,
            disp = false,
            obs
        ) => `<fieldset>
               <form data-form-name='control'>
                 <label><input type='checkbox' name="prov" data-check='prov' ${(prov) ? 'checked' : ''}></input>проверка</label>
                 <label><input type='checkbox' name="correct" data-check='correct' ${(correct) ? 'checked' : ''}></input>корректировка</label>
                 <label><input type='checkbox' name="disp" data-check='disp' ${(disp) ? 'checked' : ''}></input>диспетчерская</label>
                 <input type="button" value="DONE!" disabled>
               </form>
                <legend><span>Контроль:</span> <span data-getvalue="control">${obs}</span></legend>
             </fieldset>`;

        return checkblock(
            prov,
            correct,
            disp, obs
        )
    }

    get block() {
        const div = document.createElement('div');
        const content = this.toHTML()
        div.classList.add('block_control');
        div.innerHTML += content;
        return div


    }

}

class OutBlockBuilder {
    makeOutBlock(block) {
        const OutBlockDiv = document.createElement('div');

        const datablock = new Outblock_data(block).block;
        const optionsblock = new Outblock_options(block).block;
        const control = new Outblock_control(block).block;

        const status = block.options.status || {};

        OutBlockDiv.classList.add('out_block');
        OutBlockDiv.oncontextmenu = (event) => {
            if (event.altKey) OutBlockDiv.remove()
            if (event.ctrlKey) {
                event.currentTarget.remove()
                bdb.remove(block.data.id)
            }
        };

        OutBlockDiv.addEventListener('click', event => {
            const currentTarget = event.currentTarget;
            const control_bl = currentTarget.querySelector('[data-form-name=control]');
            const blockbtn = currentTarget.querySelector('input[type=button]');
            isDone(control_bl);

            blockbtn.onclick = () => {
                currentTarget.remove();
                bdb.remove(block.data.id)
            };

            //! check control status
            if (event.target.matches('input[type=checkbox]')) {
                status[event.target.name] = (event.target.checked) ? true : false;
                block.options.status = status
            }

            bdb.quickSave

        }, true);

        [datablock, optionsblock, control].forEach(item => OutBlockDiv.insertAdjacentElement('beforeend', item))

        return OutBlockDiv
    }
};


const bdb = new BlockDataBase();