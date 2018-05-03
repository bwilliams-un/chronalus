/**
 * 
 * This lifecycle should work as follows:
 *  - Singleton by default
 *  - Module registers with the LifeCycle for a stage with a start function (on)
 *  - When the stage is reached, run each start function (emit)
 *  - Module calls LifeCycle.Next when it is finished
 *  - Module calls LifeCycle.Next(shutdown) if it fails // Should we have a failure option to short circuit out of the lifecycle?
 *  - When LifeCycle Next is called, check if all registrations for that stage have checked in
 *      - if so, move to the next stage
 */

const DefaultLifeCycle = Object.freeze({
    '': 'init',
    'init': 'startup',
    'startup': 'running',
    'running': '',
    'shutdown': ''
});

class LifeCycle {
    constructor() {
        this.stage = null;
        this.stages = null;
        this.actions = {};
    }

    start(lifecycle = DefaultLifeCycle) {
        // validate(lifecycle)
        this.stages = Object.assign({}, lifecycle);
        this.stage = '';

        this.validateActions(this.stages, this.actions);

        this.next();
    }

    on(stage, id, func) {
        if (typeof func === 'undefined' && typeof id === 'function') {
            func = id;
            id = null;
        }
        if (!this.actions[stage]) {
            this.actions[stage] = [];
        }
        if (id != null && this.actions[stage].find(action => action.id === id)) {
            throw new Error(`Duplicate action id "${id}" registration in stage "${stage}"`);
        }
        this.actions[stage].push({ id, func });
    }

    done(stage, id) {
        this.actions[stage] = this.actions[stage].filter(action => action.id !== id);
        if (this.actions[stage].length === 0) {
            this.next();
        }
    }

    next() {
        const next = this.stages[this.stage];
        if (next) {
            this.setStage(next);
        }
    }

    setStage(stage) {
        this.stage = stage;
        if (!this.actions[stage] || this.actions[stage].length === 0) {
            this.next();
        } else {
            this.actions[stage] = this.actions[stage].filter(action => {
                action.func();
                return (action.id) ? true : false;
            });
        }
    }

    validateActions(lifecycle, actions) {
        const stages = Object.keys(lifecycle);
        Object.keys(actions).forEach(stage => {
            if (!stages.includes(stage)) {
                throw new Error(`Action registered for stage that does not exist in lifecycle: ${stage}`);
            }
        });
    }

    isStage(stage) {
        if (this.stages.hasOwnProperty(stage)) return true;
        return false;
    }
}

module.exports = new LifeCycle;
