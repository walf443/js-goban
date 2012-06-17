class Board {
    function render(): void {
    }

    function move(x:int, y:int): void {
    }
}

abstract class View {
    static abstract function render(): void {
    }
}

class CLIView extends View {
    static function render(): void {
    }
}

class CanvasView extends View {
    static function render(): void {
    }

    static function drawStone(x:int, y:int): void {
    }

    static function drawCircle(x:int, y:int): void {
    }

    static function drawBoard(): void {
    }

    static function point(x:int, y:int, r:number, width:int): void {
    }

    static function drawBackground(): void {
    }

    static function getCoordinate(x:int, y:int): number[] {
        return [1];
    }
}

