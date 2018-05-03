const lifecycle = require('../lib/index');
const serviceA = require('./moduleA');
const serviceB = require('./moduleB');

process.on('SIGINT', () => {
    lifecycle.setStage('shutdown');
});

process.on('exit', () => {
    console.log('Process exited.');
});

lifecycle.on('running', () => {
    console.log('Application is now running. CTRL+C to interrupt');
});

lifecycle.on('shutdown', () => {
    console.log('Application is shutting down...');
});

// Register services
serviceA.start();
serviceB.start();

// Begin application lifecycle
lifecycle.start();
