const LifeCycle = require('./lib/index');
const chronalus = new LifeCycle();

chronalus.on('init', () => {
    console.log('> init');
});

chronalus.on('init', () => {
    console.log('> init 2');
});

chronalus.on('startup', () => {
    console.log('> startup');
});

chronalus.start();
