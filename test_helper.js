exports = module.exports = global;

QUnit = require("./deps/qunit/qunit/qunit").QUnit;
var qunitTap = require('qunit-tap').qunitTap;
qunitTap(QUnit, require('sys').puts, { noPlan: true });
QUnit.init();

exports.assert = QUnit;

