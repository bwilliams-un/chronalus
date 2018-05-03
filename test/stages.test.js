test('On start it should begin the first stage', () => {
    const lifecycle = require('../lib/index');

    lifecycle.next = jest.fn();
    lifecycle.start();
    expect(lifecycle.next).toBeCalled();
    lifecycle.next.mockReset();
    lifecycle.next.mockRestore();
});
