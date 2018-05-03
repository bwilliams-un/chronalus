/**
 * Module A
 * This assumes you're not using pure modules and instead are using a service module style
 */

const lifecycle = require('../lib/index');

class ModuleA {
    start() {
        lifecycle.on('init', 'ModuleA', this.init.bind(this));
    }

    init() {
        console.log('Module A initialization...');
        setTimeout(() => {
            this.load();
        }, 500);
    }

    load() {
        console.log('Module A loading...');
        setTimeout(() => {
            this.done();
        }, 2000);
    }

    done() {
        console.log('Module A done.');
        lifecycle.done('init', 'ModuleA');
    }
}

module.exports = new ModuleA;