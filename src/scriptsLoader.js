const scripts = [{
        id: 'blocks',
        src: './src/scripts/blocks.js'
    }, {
        id: 'utils',
        src: './src/scripts/utils.js'
    },
    {
        id: 'model',
        src: './src/scripts/model.js'
    },
    {
        id: 'controller',
        src: './src/scripts/control.js'
    },
];

console.log('Loader is ready!');


class ScriptAppend {
    constructor(src = null) {
        this.src = src;
        this.init
    }

    script() {
        const script = document.createElement('script');
        script.src = this.src;
        return script
    }
    get init() {
        if (!this.src) return
        document.head.append(this.script(this.src))
    }
}


function loader() {
    scripts.forEach(item => {
        new ScriptAppend(item.src);
        console.log(`${item.id} added`);
    })
}

loader()