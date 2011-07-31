
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
    board.move(1, 2);
    QUnit.equal(board.turn, Goban.BLACK);
    QUnit.equal(board.point(0, 0), undefined, "黒石は取られること");
});

QUnit.module("point", {});

QUnit.test("真ん中にあるやつ", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(3, 3, Goban.BLACK);
    QUnit.equal(board.point(3, 3), Goban.BLACK, "ちゃんとsetされていること");
    QUnit.equal(board.data[3*9+3], Goban.BLACK, "ちゃんとsetされていること");
});

QUnit.test("上辺", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(0, 3, Goban.BLACK);
    QUnit.equal(board.point(0, 3), Goban.BLACK, "ちゃんとsetされていること");
    QUnit.equal(board.data[3*9+0], Goban.BLACK, "ちゃんとsetされていること");
});

QUnit.module("isDead", {});

QUnit.test("四方を囲まれて一子とられた場合", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(3, 3, Goban.BLACK);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(2, 3, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 2, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 4, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(4, 3, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("左辺", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(0, 3, Goban.BLACK);
    QUnit.equal(board.isDead(0, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(0, 2, Goban.WHITE);
    QUnit.equal(board.isDead(0, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(1, 3, Goban.WHITE);
    QUnit.equal(board.isDead(0, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(0, 4, Goban.WHITE);
    QUnit.equal(board.isDead(0, 3, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("右辺", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(8, 3, Goban.BLACK);
    QUnit.equal(board.isDead(8, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(8, 2, Goban.WHITE);
    QUnit.equal(board.isDead(8, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(7, 3, Goban.WHITE);
    QUnit.equal(board.isDead(8, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(8, 4, Goban.WHITE);
    QUnit.equal(board.isDead(8, 3, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("上辺", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(3, 0, Goban.BLACK);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(2, 0, Goban.WHITE);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(4, 0, Goban.WHITE);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 1, Goban.WHITE);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("下辺", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(3, 8, Goban.BLACK);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(2, 8, Goban.WHITE);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(4, 8, Goban.WHITE);
    QUnit.equal(board.isDead(3, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 7, Goban.WHITE);
    QUnit.equal(board.isDead(3, 8, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("左上隅", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(0, 0, Goban.BLACK);
    QUnit.equal(board.isDead(0, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(1, 0, Goban.WHITE);
    QUnit.equal(board.isDead(0, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(0, 1, Goban.WHITE);
    QUnit.equal(board.isDead(0, 0, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("左下隅", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(0, 8, Goban.BLACK);
    QUnit.equal(board.isDead(0, 8, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(1, 8, Goban.WHITE);
    QUnit.equal(board.isDead(0, 8, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(0, 7, Goban.WHITE);
    QUnit.equal(board.isDead(0, 8, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("右上隅", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(8, 0, Goban.BLACK);
    QUnit.equal(board.isDead(8, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(7, 0, Goban.WHITE);
    QUnit.equal(board.isDead(8, 0, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(8, 1, Goban.WHITE);
    QUnit.equal(board.isDead(8, 0, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("右下隅", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(8, 8, Goban.BLACK);
    QUnit.equal(board.isDead(8, 8, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(7, 8, Goban.WHITE);
    QUnit.equal(board.isDead(8, 8, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(8, 7, Goban.WHITE);
    QUnit.equal(board.isDead(8, 8, Goban.BLACK), true, "黒石は取られること");
});

QUnit.test("四方を囲まれて2子とられた場合", function() {
    var board = new Goban.Board({ 'size': 9 });
    board.point(3, 3, Goban.BLACK);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 4, Goban.BLACK);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(2, 3, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(2, 4, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 2, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(3, 5, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(4, 3, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), false, "まだ黒石は死んでないよ");
    board.point(4, 4, Goban.WHITE);
    QUnit.equal(board.isDead(3, 3, Goban.BLACK), true, "黒石は取られること");
});

QUnit.start();

