
try {
    require('../test_helper.js');
    require.paths.push('.');
    Goban = require('goban.js');
} catch (e) {
    // ignore
}
"use strict";

QUnit.module("Boardに関するテスト", {});

QUnit.test("初期化のテスト", function() {
    var board =  new Goban.Board({
        'size': 9,
    });

    for (var i = 0; i < board.data.length; i++ ) {
        QUnit.equal(undefined, board.data[i], 'initialized ok');
    }

    QUnit.equal(board.turn, Goban.BLACK, '黒が先番');
});

QUnit.test("隅のアタリ判定", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.move(0, 0);
    QUnit.equal(board.turn, Goban.WHITE, 'change turn ok');
    board.move(1, 0);
    board.move(5, 5); // てきとうなところへ打つ
    QUnit.equal(board.isDead(1, 2), true, 'アタリであること');
    board.move(1, 2);
    QUnit.equal(board.turn, Goban.BLACK);
    // TODO: assert.equal(board.data[0], undefined);
});

QUnit.start();
