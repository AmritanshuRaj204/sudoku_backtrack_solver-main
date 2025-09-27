// Play page logic for Sudoku game
// Generates puzzle, handles timer, verify, and solve
// EASY PUZZLES - 10 samples with 35-45 given numbers
const easyPuzzles = [
  [5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],
  [8,0,0,0,0,0,0,0,0,0,0,3,6,0,0,0,0,0,0,7,0,0,9,0,2,0,0,0,5,0,0,0,7,0,0,0,0,0,0,0,4,5,7,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,7,9,0,0,0,0,0,0,0,0,0,6,0,0,0,0,2,8,0,0],
  [0,2,0,6,0,8,0,0,0,5,8,0,0,0,9,7,0,0,0,0,0,0,4,0,5,7,0,0,0,0,1,0,5,0,0,2,0,0,6,0,0,0,0,0,0,3,0,0,0,0,8,0,0,0,0,0,2,0,0,0,6,0,0,0,0,0,0,5,0,0,9,0,0,0,0,0,1,3,0,0,0],
  [1,0,4,0,0,0,0,0,9,0,0,0,0,6,0,0,0,3,0,0,2,5,0,0,0,0,8,0,0,0,7,0,0,1,0,0,5,0,0,0,9,0,0,0,7,0,0,1,0,0,2,0,0,0,4,0,0,0,0,6,9,0,0,8,0,0,0,7,0,0,0,0,6,0,0,0,0,0,4,0,0],
  [0,7,0,0,4,0,1,0,0,6,0,0,0,0,0,0,0,5,0,0,0,0,9,0,0,0,0,8,0,0,0,0,0,0,0,2,0,5,0,0,0,0,0,6,9,0,0,0,0,0,0,0,0,8,1,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,3,7,0,0,6,0,8,0,0,0,0],
  [9,0,8,0,0,0,0,0,6,0,0,0,9,0,0,0,4,0,0,7,0,0,0,0,2,0,0,0,9,0,0,0,3,0,0,8,4,0,0,0,0,0,0,0,2,7,0,0,1,0,0,0,5,0,0,0,9,0,0,0,0,1,0,0,2,0,0,0,5,0,0,0,3,0,0,0,0,0,8,0,0],
  [0,0,0,0,0,2,0,0,0,0,6,0,0,0,0,7,0,1,0,0,9,0,4,0,0,0,8,0,0,5,0,0,7,0,0,0,1,0,0,9,0,0,0,0,0,0,3,0,0,8,0,0,2,0,6,0,0,7,0,0,9,0,0,4,0,2,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0],
  [2,0,0,0,8,0,3,0,0,0,6,0,0,7,0,0,8,4,0,3,0,5,0,0,0,0,2,8,0,0,0,0,0,0,0,0,0,0,7,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,5,0,7,7,0,0,0,9,0,0,6,0,0,0,8,0,6,0,0,0,1],
  [0,4,0,0,0,7,0,0,0,0,0,8,0,0,0,0,2,0,0,0,6,0,0,0,1,0,0,7,0,0,0,5,0,0,0,4,0,9,0,0,0,0,0,1,0,6,0,0,0,7,0,0,0,8,0,0,0,4,0,0,0,9,0,0,0,1,0,0,0,3,0,0,0,0,0,2,0,0,6,0,0],
  [0,0,0,7,0,0,0,4,0,0,0,0,0,0,8,0,5,0,0,0,6,0,0,0,7,0,0,5,0,0,0,0,1,0,0,8,0,0,0,9,0,6,0,0,0,2,0,0,3,0,0,0,0,7,0,0,3,0,0,0,1,0,0,0,9,0,0,6,0,0,0,0,0,1,0,0,0,4,0,0,0]
];

// MEDIUM PUZZLES - 10 samples with 28-35 given numbers
const mediumPuzzles = [
  [0,0,0,0,6,0,0,0,0,0,0,1,0,9,0,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9],
  [0,0,0,0,0,3,0,0,0,0,0,0,9,0,0,0,7,0,0,0,0,0,0,8,0,0,0,8,0,0,0,0,0,6,0,0,4,0,7,0,0,0,3,0,0,0,0,5,0,0,0,0,0,9,0,0,0,7,0,0,0,0,0,0,4,0,0,0,0,1,0,0,0,0,2,0,0,0,8,0,0],
  [0,0,0,2,0,0,3,0,0,0,0,5,0,0,0,0,9,0,0,0,8,0,0,0,0,0,6,0,0,0,0,4,0,0,0,7,0,0,0,6,0,0,0,0,0,0,3,0,0,0,8,0,0,0,7,0,0,0,0,0,2,0,0,0,5,0,0,0,0,0,9,0,0,0,0,1,0,0,0,0,0],
  [0,7,0,0,0,0,0,0,4,0,0,0,0,6,0,0,0,0,0,0,9,0,0,2,0,0,0,0,2,0,0,0,0,3,0,0,0,0,0,0,7,0,0,0,0,5,0,0,0,0,0,4,0,0,0,0,8,0,0,1,0,0,0,0,0,0,7,0,0,6,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,4,0,0,0,0,0,0,0,0,9,0,2,0,0,0,0,0,0,0,8,0,0,0,3,0,4,0,0,0,0,0,0,7,0,0,0,6,0,0,0,5,0,0,0,0,2,0,0,0,0,0,8,0,3,0,0,0,1,0,0,0,0,0,0,0,7,0,0,0,6,2,0,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,6,0,0,0,9,0,7,0,0,0,0,5,0,0,0,0,6,0,0,2,0,0,0,7,0,0,0,9,0,0,0,1,0,0,0,8,0,0,0,2,0,0,0,0,3,0,0,0,0,0,8,0,0,0,0,5,0,0,0,0,0,0,0,0,0,4],
  [0,0,0,0,0,0,2,0,0,0,0,7,0,0,0,0,6,0,0,0,0,0,4,0,0,0,0,0,0,9,0,0,0,5,0,0,0,4,0,0,0,0,0,1,0,0,8,0,0,0,6,0,0,0,0,7,0,0,0,5,0,0,0,0,8,0,0,0,9,0,0,0,3,0,0,7,0,0,0,0,0],
  [0,0,6,0,0,0,0,0,0,0,1,0,0,0,4,0,0,0,0,0,8,0,0,3,0,0,0,0,0,0,5,0,0,9,0,0,0,0,0,7,0,0,0,0,0,2,0,0,4,0,0,6,0,0,0,0,0,0,1,0,0,0,9,0,0,0,7,0,0,0,0,3,1,0,0,0,0,0,8,0,0],
  [0,0,0,5,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0,0,2,7,0,0,0,0,1,0,9,0,0,0,6,0,0,0,0,0,0,1,0,0,0,0,0,0,8,0,0,0,7,0,0,0,0,6,0,0,9,0,0,0,0,0,0,0,0,0,0,2,0,0,4,5,0,0,0,0,0,0,3],
  [0,0,7,0,0,0,0,6,0,0,0,0,9,0,0,0,0,5,0,0,0,0,0,3,0,0,0,4,0,0,0,0,1,0,0,0,0,5,0,0,7,0,0,0,2,0,0,0,9,0,0,0,0,0,0,0,0,2,0,0,6,0,0,0,7,0,0,0,4,0,0,0,8,0,0,0,0,8,0,0,0]
];

// HARD PUZZLES - 10 samples with 20-28 given numbers
const hardPuzzles = [
  [0,0,0,0,0,0,0,1,2,0,0,0,0,0,7,0,0,0,0,0,1,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,2,0,0,8,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,1,0,0,0,0,6,0,0,0,0,0,0,0,0,0,3,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,9,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,7,0,0,3,0,0,0,0,0,0,1,0,0,0,0,6,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,0,0,0,3,0,0,0,0,0,0,7,0,0,0,0,0,2,0,0,0,0,0,0,0,6,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,0,3,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,7,0,0,0,0,3,0,0,0,0,2,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,5,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,2,0,0,0,0,6,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,2,0,0,0,6,0,0,0,0,3,0,4,0,0,0,0,0,0,7,0,0,0,6,0,0,0,5,0,0,0,0,2,0,0,0,0,0,8,0,3,0,0,0,1,0,0,0,0,0,0,0,7,0,0,0,6,2,0,0,0,0,0,0,0,0],
  [0,0,0,5,0,0,0,3,0,0,7,0,0,0,0,0,0,0,0,0,2,7,0,0,0,0,1,0,9,0,0,0,6,0,0,0,0,0,0,1,0,0,0,0,0,0,8,0,0,0,7,0,0,0,0,6,0,0,9,0,0,0,0,0,0,0,0,0,0,2,0,0,4,5,0,0,0,0,0,0,3],
  [0,0,7,0,0,0,0,6,0,0,0,0,9,0,0,0,0,5,0,0,0,0,0,3,0,0,0,4,0,0,0,0,1,0,0,0,0,5,0,0,7,0,0,0,2,0,0,0,9,0,0,0,0,0,0,0,0,2,0,0,6,0,0,0,7,0,0,0,4,0,0,0,8,0,0,0,0,8,0,0,0]
];

// Remove local solveSudoku function
// function solveSudoku(grid) { ... }

async function fetchSolution(grid) {
    const res = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grid })
    });
    const data = await res.json();
    return data.solvedGrid;
}

let currentPuzzle = [];
let timerInterval = null;
let seconds = 0;

function pad(n) { return n < 10 ? '0' + n : n; }

function startTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    document.getElementById('timer').textContent = '00:00';
    timerInterval = setInterval(() => {
        seconds++;
        document.getElementById('timer').textContent = pad(Math.floor(seconds/60)) + ':' + pad(seconds%60);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function getPuzzle(level) {
    // Only return non-empty puzzles
    let pool = [];
    if (level === 'easy') pool = easyPuzzles.filter(p => p.some(x => x !== 0));
    else if (level === 'medium') pool = mediumPuzzles.filter(p => p.some(x => x !== 0));
    else pool = hardPuzzles.filter(p => p.some(x => x !== 0));
    if (pool.length === 0) {
        // fallback to at least one puzzle
        pool = [[5,3,0,0,7,0,0,0,0,6,0,0,1,9,5,0,0,0,0,9,8,0,0,0,0,6,0,8,0,0,0,6,0,0,0,3,4,0,0,8,0,3,0,0,1,7,0,0,0,2,0,0,0,6,0,6,0,0,0,0,2,8,0,0,0,0,4,1,9,0,0,5,0,0,0,0,8,0,0,7,9]];
    }
    return pool[Math.floor(Math.random()*pool.length)].slice();
}

function renderGrid(puzzle, gridId = 'play-sudoku-grid', userMode = true) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = '';
    let cells = [];
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell';
        input.maxLength = 1;
        input.pattern = '[1-9]';
        input.title = 'Enter a single digit from 1 to 9';
        input.id = `${gridId === 'play-sudoku-grid' ? 'play-cell' : 'solution-cell'}-${i}`;
        if (puzzle[i] !== 0) {
            input.value = puzzle[i];
            input.disabled = true;
            input.style.background = '#e9ecef'; // grey for prefilled
            input.style.fontWeight = 'bold';
        } else if (userMode) {
            input.style.background = '';
            input.addEventListener('input', function(event) {
                const value = input.value;
                if (value.length > 1 || !/^[1-9]?$/.test(value)) {
                    input.value = value.slice(0, 1);
                }
                if (input.value) {
                    input.style.background = '#fffacd'; // yellow for user input
                } else {
                    input.style.background = '';
                }
            });
        }
        cells.push(input);
        grid.appendChild(input);
    }
    // Arrow key navigation and number-only input
    if (userMode) {
        cells.forEach((cell, idx) => {
            cell.addEventListener('keydown', function(event) {
                switch (event.key) {
                    case 'ArrowUp':
                        focusCell(idx - 9, cells); break;
                    case 'ArrowDown':
                        focusCell(idx + 9, cells); break;
                    case 'ArrowLeft':
                        focusCell(idx - 1, cells); break;
                    case 'ArrowRight':
                        focusCell(idx + 1, cells); break;
                    default:
                        if (!['Backspace', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && !/^[1-9]$/.test(event.key)) {
                            event.preventDefault();
                        }
                }
            });
        });
    }
}

function focusCell(newIndex, cells) {
    if (newIndex >= 0 && newIndex < cells.length) {
        cells[newIndex].focus();
    }
}

function getUserGrid() {
    const arr = [];
    for (let i = 0; i < 81; i++) {
        const val = document.getElementById(`play-cell-${i}`).value;
        arr.push(val ? parseInt(val) : 0);
    }
    return arr;
}

function isSolved(grid) {
    // Simple check: all cells filled and valid
    for (let i = 0; i < 81; i++) if (!grid[i]) return false;
    // Check rows, cols, boxes
    for (let i = 0; i < 9; i++) {
        let row = new Set(), col = new Set(), box = new Set();
        for (let j = 0; j < 9; j++) {
            let r = grid[i*9+j], c = grid[j*9+i],
                b = grid[Math.floor(i/3)*27 + (i%3)*3 + Math.floor(j/3)*9 + (j%3)];
            if (row.has(r) || col.has(c) || box.has(b)) return false;
            row.add(r); col.add(c); box.add(b);
        }
    }
    return true;
}

function renderSolutionGrid(solution, baseGrid, userGrid) {
    // baseGrid: the original puzzle (prefilled cells)
    // userGrid: the user's current entries (optional, can be null)
    const grid = document.getElementById('solution-sudoku-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 81; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'cell';
        input.maxLength = 1;
        input.value = solution[i] ? solution[i] : '';
        input.disabled = true;
        input.style.fontWeight = 'bold';
        if (baseGrid[i] !== 0) {
            // Prefilled cell
            input.style.background = '#e9ecef';
        } else if (userGrid && userGrid[i] && userGrid[i] === solution[i]) {
            // User filled correctly, show yellow (same as user input)
            input.style.background = '#fffacd';
        } else {
            // Solver filled cell (not prefilled, not filled by user)
            input.style.background = '#d3ffd3'; // green
        }
        grid.appendChild(input);
    }
}

// Utility to get query param
function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

let currentLevel = getQueryParam('level') || 'easy';

function showResult(msg, correct, duration) {
    const el = document.getElementById('play-result');
    el.innerHTML = '';
    if (msg) {
        const span = document.createElement('span');
        span.textContent = msg;
        span.style.color = correct ? '#28a745' : '#dc3545';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '1.3em';
        span.style.transition = 'transform 0.5s, opacity 0.5s';
        span.style.display = 'inline-block';
        el.appendChild(span);
        if (correct && duration) {
            const time = document.createElement('div');
            time.textContent = `Solved in ${duration}`;
            time.style.color = '#007bff';
            time.style.fontWeight = '600';
            time.style.marginTop = '8px';
            time.style.fontSize = '1.1em';
            time.style.animation = 'fadeInScale 1s';
            el.appendChild(time);
        }
        span.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.2)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 900 });
    }
}

const style = document.createElement('style');
style.innerHTML = `@keyframes fadeInScale { from { opacity:0; transform:scale(0.8);} to { opacity:1; transform:scale(1);} }`;
document.head.appendChild(style);

function newGame(level) {
    if (level) currentLevel = level;
    document.getElementById('level-name').textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    currentPuzzle = getPuzzle(currentLevel);
    renderGrid(currentPuzzle);
    showResult('', true);
    startTimer();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('level-name').textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);
    newGame(currentLevel);

    document.getElementById('verify-btn').onclick = function() {
        const userGrid = getUserGrid();
        if (isSolved(userGrid)) {
            stopTimer();
            const duration = pad(Math.floor(seconds/60)) + ':' + pad(seconds%60);
            // Turn all user (non-prefilled) cells green
            for (let i = 0; i < 81; i++) {
                const cell = document.getElementById(`play-cell-${i}`);
                if (!cell.disabled) {
                    cell.style.background = '#d3ffd3';
                }
            }
            showResult('Correct! 🎉', true, duration);
        } else {
            showResult('Incorrect or incomplete. Try again!', false);
        }
    };

    document.getElementById('give-solution-btn').onclick = async function() {
        // Always solve the original puzzle, not user input
        const solution = await fetchSolution(currentPuzzle.slice());
        if (solution) {
            renderSolutionGrid(solution, currentPuzzle, null);
            document.getElementById('solution-container').style.display = 'flex';
        } else {
            document.getElementById('solution-container').style.display = 'none';
            showResult('No solution found.', false);
        }
    };

    document.getElementById('solve-btn').onclick = async function() {
        // Solve the user's current grid and fill it directly (no side-by-side)
        const userGrid = getUserGrid();
        const solution = await fetchSolution(userGrid.slice());
        if (solution) {
            for (let i = 0; i < 81; i++) {
                const cell = document.getElementById(`play-cell-${i}`);
                if (!cell.disabled) {
                    if (userGrid[i]) {
                        // User had filled this cell, keep yellow
                        cell.value = userGrid[i];
                        cell.style.background = '#fffacd';
                    } else {
                        // Computer filled
                        cell.value = solution[i];
                        cell.style.background = '#d3ffd3';
                    }
                }
            }
            showResult('Solved your grid!', true);
            showLegend();
        } else {
            showResult('No solution found for your current grid.', false);
            hideLegend();
        }
        // Hide solution grid if visible
        document.getElementById('solution-container').style.display = 'none';
    };

    // Legend display
    function showLegend() {
        let legend = document.getElementById('sudoku-legend');
        if (!legend) {
            legend = document.createElement('div');
            legend.id = 'sudoku-legend';
            legend.style.display = 'flex';
            legend.style.justifyContent = 'center';
            legend.style.gap = '24px';
            legend.style.margin = '18px 0 0 0';
            legend.style.fontSize = '1.05em';
            legend.innerHTML = `
                <span><span style="display:inline-block;width:22px;height:22px;background:#fffacd;border:1.5px solid #bbb;vertical-align:middle;margin-right:6px;"></span> Filled by you</span>
                <span><span style="display:inline-block;width:22px;height:22px;background:#d3ffd3;border:1.5px solid #bbb;vertical-align:middle;margin-right:6px;"></span> Filled by computer</span>
                <span><span style="display:inline-block;width:22px;height:22px;background:#e9ecef;border:1.5px solid #bbb;vertical-align:middle;margin-right:6px;"></span> Prefilled</span>
            `;
            document.querySelector('.play-container').appendChild(legend);
        } else {
            legend.style.display = 'flex';
        }
    }
    function hideLegend() {
        let legend = document.getElementById('sudoku-legend');
        if (legend) legend.style.display = 'none';
    };
});
