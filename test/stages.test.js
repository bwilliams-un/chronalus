const LifeCycle = require('../lib/index');

test('On start it should begin the next stage', () => {
    const chronalus = new LifeCycle();
    chronalus.next = jest.fn();
    chronalus.start();
    expect(chronalus.next).toBeCalled();
    chronalus.next.mockReset();
    chronalus.next.mockRestore();
});

test('On start it should step through all default stages', () => {
    const chronalus = new LifeCycle();

    const setStage = jest.spyOn(chronalus, 'setStage');
    chronalus.start();
    const allStages = Object.keys(chronalus.stages);
    expect(setStage).toHaveBeenCalledTimes(allStages.length);
});