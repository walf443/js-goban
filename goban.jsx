class Board {
    var size: int;
    var data: Array.<int>;

    function render(): void {
    }

    function move(x:int, y:int): void {
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
    }
    override function render(): void {
        for (var i = 0; i < this.board.size; i++ ) {
            var line = "|";
            for (var j = 0; j < this.board.size; j++ ) {
                var val = this.board.data[i*this.board.size + j] as int;
                var char : string;
                switch ( val ) {
                    case 0:
                        char = "x";
                        break;
                    case 1:
                        char = "○";
                        break;
                    case 2:
                        char = " ";
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

