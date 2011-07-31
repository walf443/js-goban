require('../test_helper.js');
require.paths.push('.');
var Goban = require('goban.js');

QUnit.test("初期化のテスト", function() {
    var board =  Goban.Board({
        'size': 9,
    });
    assert.equal(board.data.length, 9*9, 'board size initialized');

    for (var i = 0; i < board.data.length; i++ ) {
        assert.equal(undefined, board.data[i], 'initialized ok');
    }

    assert.equal(board.turn, Goban.BLACK, '黒が先番');
});

QUnit.test('hoge', function() {
    assert.ok(1);
});

QUnit.test("隅のアタリ判定", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.move(0, 0);
    assert.equal(board.turn, Goban.WHITE, 'change turn ok');
    board.move(1, 0);
    board.move(5, 5); // てきとうなところへ打つ
    assert.equal(board.isDead(1, 2), true, 'アタリであること');
    board.move(1, 2);
    assert.equal(board.turn, Goban.BLACK);
    // TODO: assert.equal(board.data[0], undefined);
});

QUnit.start();
