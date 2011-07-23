var Goban = (function() {
    "use strict";

    // for node test
    try {
        module.exports = this;
    } catch (e) {
    };

    this.BLACK = 0;
    this.WHITE = 1;
    var goban = this;

    this.Board = function (options)
    {
        this.size = options.size;

        this.data = [];

        for (var i=0; i< this.size; i++ ) {
            for (var j = 0; j < this.size; j++ ) {
                this.data[i*this.size+j] = undefined;
            }
        }

        this.turn = goban.BLACK;

        this.viewClass = options.viewClass;
        this.viewOptions = options.viewOptions;

        this.changeTurn = function() {
            if ( this.turn == goban.BLACK ) {
                this.turn = goban.WHITE;
            } else {
                this.turn = goban.BLACK;
            }
        };

        this.move = function(x, y) {
            if ( this.data[y*this.size+x] == undefined ) {
                this.data[y*this.size+x] = this.turn; // TODO
                this.changeTurn();
            } else {
                throw "Can't move to this position";
            }
        };

        this.render = function() {
            this.viewOptions.board = this;
            var view = new this.viewClass(this.viewOptions)
            view.render();
        }

        return this;
    };

    this.CanvasView = function(options) {

        this.backgroundColor = options.backgroundColor ? options.backgroundColor : 'rgb(172, 130, 70)';

        this.board = options.board;

        this.dom = options.document.getElementById(options.id);
        this.canvas = this.dom.getContext('2d');

        this.render = function() {
            this.drawBoard();
            for (var i=0; i<this.board.size; i++) {
                for (var j=0; j<this.board.size; j++) {
                    this.drawStone(i, j);
                }
            }
        };

        this.drawStone = function(x, y) {
            var value = this.board.data[y*this.board.size+x];
            switch (value) {
                case undefined:
                    break;
                case goban.BLACK:
                    this.canvas.fillStyle = 'rgb(0, 0, 0)';
                    this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                    break;
                case goban.WHITE:
                    this.canvas.fillStyle = 'rgb(255, 255, 255)';
                    this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                    break;
            }
            if ( value != undefined ) {
                var unit_radius = this.dom.width / this.board.size / 2 * 0.8;
                this.point(x, y, unit_radius);
            }

        }

        this.drawBoard = function() {
            this.drawBackground();
            this.canvas.fillStyle = 'rgb(0, 0, 0)';
            this.canvas.strokeStyle = 'rgb(0, 0, 0)';

            var unit_height = this.dom.height / this.board.size;
            var unit_width = this.dom.width / this.board.size;

            // vertical line
            for (var i = 0; i < this.board.size; i++ ) {
                this.canvas.beginPath();
                var start_coordinate = this.getCoordinate(i, 0);
                this.canvas.moveTo(start_coordinate[0], start_coordinate[1]);
                var finish_coordinate = this.getCoordinate(i, this.board.size - 1);
                this.canvas.lineTo(finish_coordinate[0], finish_coordinate[1]);
                this.canvas.closePath();
                this.canvas.stroke();
            }

            // horizontal line
            for (var j = 0; j < this.board.size; j++ ) {
                this.canvas.beginPath();
                var start_coordinate = this.getCoordinate(0, j);
                this.canvas.moveTo(start_coordinate[0], start_coordinate[1]);
                var finish_coordinate = this.getCoordinate(this.board.size - 1, j);
                this.canvas.lineTo(finish_coordinate[0], finish_coordinate[1]);
                this.canvas.closePath();
                this.canvas.stroke();
            }

            var radius = 2;
            switch (this.board.size) {
                case 9:
                    this.point(2, 2, radius);
                    this.point(2, 5-1, radius);
                    this.point(2, 9-1-2, radius);
                    this.point(5-1, 9-1-2, radius);
                    this.point(9-1-2, 9-1-2, radius);
                    this.point(9-1-2, 5-1, radius);
                    this.point(9-1-2, 2, radius);
                    this.point(5-1, 2,radius);

                    this.point(5-1, 5-1,radius);
                    break;
                case 13:
                    // TODO
                    break;
                case 19:
                    this.point(3, 3, radius);
                    this.point(3, 10-1, radius);
                    this.point(3, 19-1-3, radius);
                    this.point(10-1, 19-1-3, radius);
                    this.point(19-1-3, 19-1-3, radius);
                    this.point(19-1-3, 10-1, radius);
                    this.point(19-1-3, 3, radius);
                    this.point(10-1, 3, radius);
                    this.point(10-1, 10-1, radius);
                    break;
                default:
                    break;
            }
        };

        this.point = function(x, y, r) {
            var coordinates = this.getCoordinate(x, y);
            this.canvas.beginPath();
            this.canvas.arc(coordinates[0], coordinates[1], r, 0, Math.PI * 2, false);
            this.canvas.fill();
        };

        // return real coordinates from virtual coodinate.
        this.getCoordinate = function(x, y) {
            var unit_height = this.dom.height / this.board.size;
            var unit_width = this.dom.width / this.board.size;
            return [unit_width / 2 + unit_width * x, unit_height / 2 + unit_height * y];
        }

        this.drawBackground = function() {
            this.canvas.fillStyle = this.backgroundColor;
            this.canvas.fillRect(0, 0, this.dom.width, this.dom.height);
        }

        return this;
    };

    return this;
})();

