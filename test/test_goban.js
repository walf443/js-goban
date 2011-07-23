require.paths.push('.');
var assert = require('assert');
var Goban = require('goban.js');

var board =  Goban.Board({
    'size': 9,
});

assert.equal(board.data.length, 9*9, 'board size initialized');

for (var i = 0; i < board.data.length; i++ ) {
    assert.equal(undefined, board.data[i], 'initialized ok');
}

assert.equal(board.turn, Goban.BLACK, '黒が先番');
