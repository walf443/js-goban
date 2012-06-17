import 'goban.jsx' into goban;
import 'timer.jsx';

class _Main {
    static function main(): void {
        var board = new goban.Board(19);
        var moves: Array.<Array.<number>> = [
            [4, 4],
            [3, 3],
            [2, 5],
            [5, 3],
            [1, 3],
            [2, 2],
            [2, 8]
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

