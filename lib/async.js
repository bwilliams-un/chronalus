const EventEmitter = require('events');

const DefaultLifeCycle = Object.freeze({
    '': 'init',
    'init': 'startup',
    'startup': 'running',
    'running': '',
    'shutdown': ''
});

/**
 * This is not used. This was an initial rough sketch. Left for posterity
 * This is an Async Lifecycle that cycles through stages completing promises registered with stages
 * This was never completed
 */

class LifeCycle extends EventEmitter {
    constructor() {
        super();

        this.stage = null;
        this.stages = null;
    }

    start(lifecycle = DefaultLifeCycle) {
        // validate(lifecycle)
        this.stages = Object.assign({}, lifecycle);
        this.stage = '';
        this.next();
    }

    on(stage, listener) {
        // This assumes we're always moving forward in stages. TODO Are we?
        console.log('on(%s)', stage, listener);
        const wrapper = (...args) => {
            console.log('wrapper(%s)', listener, ...args);
            // We don't know if the listener is async or not, so resolve them all
            Promise.resolve(listener, ...args)
                .then(() => {
                    super.removeListener(stage, wrapper);
                    this.next();
                })
                .catch(() => {
                    super.removeListener(stage, wrapper);
                    this.next();
                });
        };
        super.on(stage, wrapper);
    }

    next() {
        console.log('next()');
        if (this.listeners(this.stage) > 0) {
            console.log('cannot next %d listeners', this.listeners(this.stage));
            return;
        } else {
            console.log('all tasks completed, moving to next stage');
        }
        const next = this.stages[this.stage];
        if (next) {
            this.setStage(next);
        }
    }

    setStage(stage) {
        console.log('setStage(%s)', stage);
        this.stage = stage;
        this.emit(stage);
    }

    emit(event) {
        console.log('emit(%s) listeners: ', event, this.listeners(event));
        super.emit(...arguments);
    }
}

module.exports = LifeCycle;