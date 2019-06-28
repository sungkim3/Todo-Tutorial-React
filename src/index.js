import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button style={props.styles} className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square styles={this.props.squares[i].backgroundColor} value={this.props.squares[i].value} onClick={() => this.props.onClick(i)} />
        );
    }

    
  
    render() {
        return (
        <div>
            <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
            </div>
            <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
            <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
            </div>
        </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill({
                    backgroundColor: { backgroundColor: 'white' },
                    value: null
                }),
                index: null,
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i].value) {
            return;
        }
        const xOption = {
            backgroundColor: { backgroundColor: 'white' },
            value: 'X'
        }
        const oOption = {
            backgroundColor: { backgroundColor: 'white' },
            value: 'O'
        }
        squares[i] = this.state.xIsNext ?  xOption : oOption;
        this.setState({
            history: history.concat([{
                squares: squares,
                index: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            
        });
    }

    jumpTo(step, index) {
        // method to reset state when jumping to a move
        // step is the move number, 0 means no moves have been made yet
        const history = this.state.history.slice(0, step + 1);
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: history
        });
    }

    highlightSquare(index) {
        if (index > 0){
            let history = this.state.history.slice();
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            const newColor = { backgroundColor: 'red' };
            squares[index].backgroundColor = newColor;

            history[history.length - 1].squares = squares;
            
            this.setState({
                history: history,
            });
        }
    }

    unHighlightSquare(index) {
        if (index > 0){
            let history = this.state.history.slice();
            const current = history[history.length - 1];
            const squares = current.squares.slice();
            const newColor = { backgroundColor: 'white' };
            squares[index].backgroundColor = newColor;

            history[history.length - 1].squares = squares;
            
            this.setState({
                history: history,
            });
        }

    }

    render() {
        console.log('render game');
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const index = step.index;
            let col = (index % 3 + 1);
            let row = Math.floor(((index / 3) + 1));
            const desc = move ? 'Go to move #' + move + ' Coord: ('+col+','+row+')' : 'Go to game start';
            return (
                <li key={move}>
                    <button 
                    onClick={() => this.jumpTo(move, step.index)}
                    onMouseEnter={() => this.highlightSquare(step.index)}
                    onMouseLeave={() => this.unHighlightSquare(step.index)}
                    >{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
}
  
// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a].value && squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
            return squares[a].value;
        }
    }
    return null;
}