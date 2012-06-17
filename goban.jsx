

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
        var view = new CLIView(this);
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
    override function render(): void {
    }

    function drawStone(x:int, y:int): void {
    }

    function drawCircle(x:int, y:int): void {
    }

    function drawBoard(): void {
    }

    function point(x:int, y:int, r:number, width:int): void {
    }

    function drawBackground(): void {
    }

    function getCoordinate(x:int, y:int): number[] {
        return [1];
    }
}

