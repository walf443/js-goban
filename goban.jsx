import "js/web.jsx";

class Goban {
    static const NULL: int = 0;
    static const BLACK: int = 1;
    static const WHITE: int = 2;
}

class Board {
    var size: int;
    var data : Array.<int>;
    var turn : int;

    function constructor() {
        this.turn = Goban.BLACK;
    }

    function constructor(size:int) {
        this.size = size;
        this.data = new Array.<int>;
        for (var i = 0; i < this.size * this.size; i++ ) {
            this.data[i] = 0;
        }
    }

    function render(): void {
        var view = new CanvasView(this, 'goban');
        view.render();
    }

    function move(x:int, y:int): void {
        if ( this.point(x, y) == Goban.NULL ) {
            log [x, y, this.turn];
            this.point(x, y, this.turn);
            this.changeTurn();
        } else {
            throw "Can't move to this position!!";
        }
    }

    function changeTurn(): void {
        if ( this.turn == Goban.BLACK ) {
            this.turn = Goban.WHITE;
        } else {
            this.turn = Goban.BLACK;
        }
    }

    function point(x: int, y: int): int {
        return this.data[y * this.size + x];
    }

    function point(x: int, y: int, value: int): int {
        return this.data[y * this.size + x] = value;
    }
}

abstract class View {
    var board: Board;
    function constructor() {
    }

    function constructor(board: Board) {
        this.board = board;
    }
    abstract function render(): void {
    }
}

class CLIView extends View {
    function constructor(board: Board) {
        this.board = board;
    }
    override function render(): void {
        for (var i = 0; i < this.board.size; i++ ) {
            var line = "|";
            for (var j = 0; j < this.board.size; j++ ) {
                var val = this.board.data[i*this.board.size + j] as int;
                var char : string;
                switch ( val ) {
                    case Goban.NULL:
                        char = " ";
                        break;
                    case Goban.BLACK:
                        char = "x";
                        break;
                    case Goban.WHITE:
                        char = "○";
                        break;
                    default:
                        // must not through
                        char = "";
                        break;
                }

                line += char;
            }

            log(line + "|");
        }
    }
}

class CanvasView extends View {
    var backgroundColor = 'rgb(172, 130, 70)';
    var dom: HTMLCanvasElement;
    var canvas: CanvasRenderingContext2D;

    function constructor(board: Board) {
        this.board = board;
    }

    function constructor(board: Board, id: string) {
        this.board = board;
        
        this.dom = dom.id(id) as HTMLCanvasElement;
        this.canvas = this.dom.getContext('2d') as CanvasRenderingContext2D;
    }

    override function render(): void {
        this.drawBoard();
        for (var i = 0; i < this.board.size; i++ ) {
            for ( var j = 0; j < this.board.size; j++ ) {
                this.drawStone(i, j);
            }
        }
    }

    function drawStone(x:int, y:int): void {
        var value = this.board.data[y * this.board.size + x];
        switch (value) {
            case Goban.NULL:
                break;
            case Goban.BLACK:
                this.canvas.fillStyle = 'rgb(0, 0, 0)';
                this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                break;
            case Goban.WHITE:
                this.canvas.fillStyle = 'rgb(255, 255, 255)';
                this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                break;
        }
        if (value != Goban.NULL ) {
            var unit_radius = this.dom.width / this.board.size / 2 * 0.8;
            this.point(x, y, unit_radius, true);
        }
    }

    function drawCircle(x:int, y:int): void {
        var value = this.board.data[y* this.board.size + x];
        switch (value) {
            case Goban.NULL:
                this.canvas.fillStyle = 'rgb(0, 0, 0, 0)';
                this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                break;
            case Goban.BLACK:
                this.canvas.fillStyle = 'rgb(0, 0, 0,0)';
                this.canvas.strokeStyle = 'rgb(255, 255, 255)';
                break;
            case Goban.WHITE:
                this.canvas.fillStyle = 'rgb(0, 0, 0,0)';
                this.canvas.strokeStyle = 'rgb(0, 0, 0)';
                break;
        }
        var unit_radius = this.dom.width / this.board.size / 4 * 0.8;
        this.point(x, y, unit_radius, true);
    }

    function drawBoard(): void {
        this.drawBackground();
        this.canvas.fillStyle = 'rgb(0, 0, 0)';
        this.canvas.strokeStyle = 'rgb(0, 0, 0)';

        var unit_height = this.dom.height / this.board.size;
        var unit_width = this.dom.width / this.board.size;

        // vertical line
        for (var i = 0; i < this.board.size; i++) {
            this.canvas.beginPath();
            var start_coordinate = this.getCoordinate(i, 0);
            this.canvas.moveTo(start_coordinate[0], start_coordinate[1]);
            var finish_coordinate = this.getCoordinate(i, this.board.size - 1);
            this.canvas.lineTo(finish_coordinate[0], finish_coordinate[1]);
            this.canvas.closePath();
            this.canvas.stroke();
        }

        // horizontal line
        for (var j = 0; j < this.board.size; j++) {
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
                this.point(2, 5 - 1, radius);
                this.point(2, 9 - 1 - 2, radius);
                this.point(5 - 1, 9 - 1 - 2, radius);
                this.point(9 - 1 - 2, 9 - 1 - 2, radius);
                this.point(9 - 1 - 2, 5 - 1, radius);
                this.point(9 - 1 - 2, 2, radius);
                this.point(5 - 1, 2, radius);

                this.point(5 - 1, 5 - 1, radius);
                break;
            case 13:
                // TODO
                break;
            case 19:
                this.point(3, 3, radius);
                this.point(3, 10 - 1, radius);
                this.point(3, 19 - 1 - 3, radius);
                this.point(10 - 1, 19 - 1 - 3, radius);
                this.point(19 - 1 - 3, 19 - 1 - 3, radius);
                this.point(19 - 1 - 3, 10 - 1, radius);
                this.point(19 - 1 - 3, 3, radius);
                this.point(10 - 1, 3, radius);
                this.point(10 - 1, 10 - 1, radius);
                break;
            default:
                break;
        }
    }

    function point(x:int, y:int, r:number): void {
        var coordinates =  this.getCoordinate(x, y);
        this.canvas.beginPath();
        this.canvas.arc(coordinates[0], coordinates[1], r, 0, Math.PI * 2, false);
        this.canvas.closePath();

        this.canvas.stroke();
    }

    function point(x:int, y:int, r:number, is_fill:boolean): void {
        var coordinates =  this.getCoordinate(x, y);
        this.canvas.beginPath();
        this.canvas.arc(coordinates[0], coordinates[1], r, 0, Math.PI * 2, false);
        this.canvas.closePath();

        this.canvas.fill();
    }

    function drawBackground(): void {
        this.canvas.fillStyle = this.backgroundColor;
        this.canvas.fillRect(0, 0, this.dom.width, this.dom.height);
    }

    function getCoordinate(x:int, y:int): number[] {
        var unit_height = this.dom.height / this.board.size;
        var unit_width = this.dom.width / this.board.size;
        return [unit_width / 2 + unit_width * x, unit_height / 2 + unit_height * y];
    }
}

