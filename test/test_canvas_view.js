
try {
    require('../test_helper.js');
    require.paths.push('.');
    Goban = require('goban.js');
} catch (e) {
}

"use strict";
QUnit.module("CanvasViewのテスト", {});

QUnit.test("getCoordinateがどのくらいになるのかのテスト", function() {
    var board = new Goban.Board({
        'size': 19,
    });
    var view = new Goban.CanvasView({
        'board': board,
        'document': {
            getElementById: function() {
                return {
                    'height': 300,
                    'width': 300,
                    getContext: function() {
                    },
                };
            },
        },
    });

    QUnit.deepEqual([7.894736842105263,7.894736842105263], view.getCoordinate(0, 0), "left top");
    QUnit.deepEqual([7.894736842105263,292.10526315789474], view.getCoordinate(0, 18), "left bottom");
    QUnit.deepEqual([292.10526315789474,7.894736842105263], view.getCoordinate(18, 0), "right top");
    QUnit.deepEqual([292.10526315789474, 292.10526315789474], view.getCoordinate(18, 18), "right bottom");
});

QUnit.start();
