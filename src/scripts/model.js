class MySpy {
    constructor() {
        this.changed = false;
        this.spy = [];
    }

    get changed() {
        this.changed = true
        return this._changed
    }
    set changed(value) {
        let box = [];
        if (value) {
            box.push(value);
            return spylog('value:', value)
        } else {
            this.spy = box
            return spylog('spy:', value)
        }


    }
}

const ms = new MySpy()