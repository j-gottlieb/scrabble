const {getEmptyBoard, getNewWords} = require('../board_parsing');

test('returns new board' , () => {
    expect(getEmptyBoard().length).toBe(225);
});

test('it returns new words', () => {
    
})