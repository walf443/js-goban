class Board {
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

