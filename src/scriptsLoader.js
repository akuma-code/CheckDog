const scripts = [{
    id: 'blocks',
    src: '/src/scripts/blocks.js'
}, {
    id: 'utils',
    src: '/src/scripts/utils.js'
}];

console.log('Loader is ready!');


class Ascript {
    constructor(src = null) {
        document.head.append(this.elem(src))
    }

    elem(src) {
        const script = document.createElement('script');
        script.src = src;
        return script
    }
}


const loader = scripts.forEach(item => {
    new Ascript(item.src);
    console.log(`${item.id} added`);
})