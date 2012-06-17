import 'goban.jsx' into goban;
import 'timer.jsx';

class _Main {
    static function main(): void {
        var board = new goban.Board();
        var moves: Array.<Array.<number>> = [
            [3, 3],
            [2, 5],
            [6, 3],
            [1, 3],
            [2, 2],
            [2, 7]
        ];
        Timer.setInterval(function(): void {
            var move = moves.shift();
            if ( move != undefined ) {
                board.move(move[0], move[1]);
                board.render();
            }

        }, 1000);
    }
}

