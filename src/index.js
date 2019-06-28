import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={`square ${ props.className }`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    render() {
        let rows = [];
        for (var i=0; i < this.props.rows; i++) {
            let squares = [];
            for (var x=0; x < this.props.rows; x++) {
                const index = x + (3 * i);
                const square = this.props.squares[index];
                squares.push(<Square key={index} className={square.className} value={square.value} onClick={() => this.props.onClick(index)} />)
            }
            rows.push(
                <div key={i} className="board-row">
                    {squares}
                </div>
            );
        }
        
        return (
        <div>
            {rows}
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
                    value: null,
                    className: 'unhighlighted',
                }),
                index: null,
                stepNumber: 0
            }],
            stepNumber: 0,
            xIsNext: true,
            ascending: true,
        }
    }

    handleClick(i) {
        const xOption = {
            value: 'X',
            className: 'unhighlighted',
        }
        const oOption = {
            value: 'O',
            className: 'unhighlighted',
        }

        let history = this.state.history.slice(0, this.state.stepNumber + 1);
        let current;
        if (this.state.ascending) {
            current = history[history.length - 1];
        } else {
            current = history[0];
        }
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i].value) {
            return;
        }
        squares[i] = this.state.xIsNext ?  xOption : oOption;

        if (this.state.ascending) {
            history = history.concat([{
                squares: squares,
                index: i,
                stepNumber: history.length
            }])
        } else {
            history = [{
                squares: squares,
                index: i,
                stepNumber: history.length
            }].concat(history);
        }

        this.setState({
            history: history,
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });

    }

    handleSort() {
        let history = this.state.history.slice();
        if (this.state.ascending) {
            history = history.sort((a, b) => (a.stepNumber < b.stepNumber) ? 1: ((b.stepNumber > a.stepNumber) ? -1 : 0))
        } else {
            history = history.sort((a, b) => (b.stepNumber < a.stepNumber) ? 1: ((a.stepNumber > b.stepNumber) ? -1 : 0))
        }
        this.setState({
            history: history,
            ascending: !this.state.ascending
        })
    }

    jumpTo(step) {
        let history;
        let current;
        if (!step) {
            step = 0;
        }
        if (this.state.ascending){
            history = this.state.history.slice(0, step + 1);
            current = history[history.length - 1];
        } else {
            history = this.state.history.slice(this.state.history.length - (step + 1), this.state.history.length);
            current = history[0];
        }

        const squares = current.squares.slice();
        for (var i=0; i<squares.length; i++){
            squares[i].className = 'unhighlighted';
        }

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: history
        });
    }

    highlightSquare(index) {
        let history = this.state.history.slice();
        let current;
        if (this.state.ascending) {
            current = history[history.length - 1];
        } else {
            current = history[0];
        }
        if (index !== null) {
            let squares = current.squares;
            squares[index].className = 'highlighted';
                        
            this.setState({
                history: history,
            });
        }
    }

    unHighlightSquare(index) {
        let history = this.state.history.slice();
        let current 
        if (this.state.ascending) {
            current = history[history.length - 1];
        } else {
            current = history[0];
        }
        if (index !== null) {
            const squares = current.squares;
            squares[index].className = 'unhighlighted';
            
            this.setState({
                history: history,
            });
        }
    }

    render() {
        console.log('render game');
        const history = this.state.history;
        const ascending = this.state.ascending;
        let current;
        if (ascending) {
            current = history[history.length - 1];
        } else {
            current = history[0];
        }
        
        const moves = history.map((step, move) => {
            const index = step.index;
            let col = (index % 3 + 1);
            let row = Math.floor(((index / 3) + 1));
            const desc = step.stepNumber ? 'Go to move #' + step.stepNumber + ' Coord: ('+col+','+row+')' : 'Go to game start';
            return (
                <li key={move}>
                    <button 
                    onClick={() => this.jumpTo(step.stepNumber)}
                    onMouseEnter={() => this.highlightSquare(step.index)}
                    onMouseLeave={() => this.unHighlightSquare(step.index)}
                    >{desc}</button>
                </li>
            );
        });

        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        let sortStatus;
        if (ascending) {
            sortStatus = 'Ascending';
        } else {
            sortStatus = 'Descending';
        }

        const rows = 3;
        return (
        <div className="game">
            <div className="game-board">
            <Board rows={rows} squares={current.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.handleSort()}>{sortStatus}</button>
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
            squares[a].className = 'highlighted';
            squares[b].className = 'highlighted';
            squares[c].className = 'highlighted';
            return squares[a].value;
        }
    }
    return null;
}