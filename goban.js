Goban = (function() {
    var exports = {};

    exports.Board = function (options)
    {
        var self = {};

        self.size = options.size;

        return self;
    };

    exports.CanvasView = function(options) {
        var self = {};

        self.backgroundColor = options.backgroundColor ? options.backgroundColor : 'rgb(172, 130, 70)';

        self.board = options.board;

        self.dom = options.document.getElementById(options.id);
        self.canvas = self.dom.getContext('2d');

        self.render = function() {
            self.writeBoard();
        };

        self.writeBoard = function() {
            self.writeBackground();
            self.canvas.fillStyle = 'rgb(0, 0, 0)';
            self.canvas.strokeStyle = 'rgb(0, 0, 0)';

            var unit_height = self.dom.height / self.board.size;
            var unit_width = self.dom.width / self.board.size;

            // vertical line
            for (var i = 0; i < self.board.size; i++ ) {
                self.canvas.beginPath();
                var start_coordinate = self.getCoordinate(i, 0);
                self.canvas.moveTo(start_coordinate[0], start_coordinate[1]);
                var finish_coordinate = self.getCoordinate(i, self.board.size - 1);
                self.canvas.lineTo(finish_coordinate[0], finish_coordinate[1]);
                self.canvas.closePath();
                self.canvas.stroke();
            }

            // horizontal line
            for (var j = 0; j < self.board.size; j++ ) {
                self.canvas.beginPath();
                var start_coordinate = self.getCoordinate(0, j);
                self.canvas.moveTo(start_coordinate[0], start_coordinate[1]);
                var finish_coordinate = self.getCoordinate(self.board.size - 1, j);
                self.canvas.lineTo(finish_coordinate[0], finish_coordinate[1]);
                self.canvas.closePath();
                self.canvas.stroke();
            }

            var radius = 2;
            switch (self.board.size) {
                case 9:
                    self.point(2, 2, radius);
                    self.point(2, 5-1, radius);
                    self.point(2, 9-1-2, radius);
                    self.point(5-1, 9-1-2, radius);
                    self.point(9-1-2, 9-1-2, radius);
                    self.point(9-1-2, 5-1, radius);
                    self.point(9-1-2, 2, radius);
                    self.point(5-1, 2,radius);

                    self.point(5-1, 5-1,radius);
                    break;
                case 13:
                    // TODO
                    break;
                case 19:
                    self.point(3, 3, radius);
                    self.point(3, 10-1, radius);
                    self.point(3, 19-1-3, radius);
                    self.point(10-1, 19-1-3, radius);
                    self.point(19-1-3, 19-1-3, radius);
                    self.point(19-1-3, 10-1, radius);
                    self.point(19-1-3, 3, radius);
                    self.point(10-1, 3, radius);
                    self.point(10-1, 10-1, radius);
                    break;
                default:
                    break;
            }
        };

        self.point = function(x, y, r) {
            var coordinates = self.getCoordinate(x, y);
            self.canvas.beginPath();
            self.canvas.arc(coordinates[0], coordinates[1], r, 0, Math.PI * 2, false);
            self.canvas.stroke();
        };

        // return real coordinates from virtual coodinate.
        self.getCoordinate = function(x, y) {
            var unit_height = self.dom.height / self.board.size;
            var unit_width = self.dom.width / self.board.size;
            return [unit_width / 2 + unit_width * x, unit_height / 2 + unit_height * y];
        }

        self.writeBackground = function() {
            self.canvas.fillStyle = self.backgroundColor;
            self.canvas.fillRect(0, 0, self.dom.width, self.dom.height);
        }

        return self;
    };

    return exports;
})();
