const scripts = [{
        id: 'ScriptsLoader'
    },
    {
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
    const loaded = [];
    scripts.forEach(item => {
        new ScriptAppend(item.src);
        loaded.push(item.id)
    })
    console.log(`Added scripts: ${loaded.join(', ')}`);
}

loader()