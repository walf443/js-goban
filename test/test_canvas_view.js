"use strict";
// getCoordinateがどのくらいになるかのテスト

require.paths.push('.');
var assert = require('assert');
var Goban = require('goban');

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

assert.deepEqual([7.894736842105263,7.894736842105263], view.getCoordinate(0, 0), "left top");
assert.deepEqual([7.894736842105263,292.10526315789474], view.getCoordinate(0, 18), "left bottom");
assert.deepEqual([292.10526315789474,7.894736842105263], view.getCoordinate(18, 0), "right top");
assert.deepEqual([292.10526315789474, 292.10526315789474], view.getCoordinate(18, 18), "right bottom");

