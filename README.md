# Sudoku Backtrack Solver

Welcome to the Sudoku Backtrack Solver project! This project provides a modern, interactive web-based Sudoku experience with both a solver and a play mode, powered by a C++ backtracking algorithm and a Node.js backend.

## Project Structure

- **C++ Solver**: A C++ program that solves Sudoku puzzles using a backtracking algorithm.
- **Node.js Server**: An Express.js server that interfaces with the C++ solver and provides a RESTful API.
- **Frontend**: Modern HTML/CSS/JavaScript interface for both playing Sudoku and solving custom puzzles.

## Features

- **Play Sudoku**: Play randomly selected Sudoku puzzles at Easy, Medium, or Hard levels.
- **Level Selection**: Choose your difficulty before starting a new game.
- **Timer**: Track how long you take to solve each puzzle.
- **Solution & Verify**: Check your solution or reveal the answer at any time.
- **Keyboard Navigation**: Use arrow keys to move between cells; only numbers 1-9 are accepted.
- **Cell Coloring**: 
  - Grey: Prefilled cells
  - Yellow: Cells filled by you
  - Green: Cells filled by the computer/solution
- **Side-by-Side Solution**: Compare your attempt with the correct solution.
- **Legend**: Visual legend explains cell colors after solving.
- **Responsive Layout**: Modern, mobile-friendly design.
- **Landing Page**: The play experience is now the default landing page (`index.html`).
- **Classic Solver**: Access the original solver interface via the "Sudoku Solver from Scratch" button.

## Getting Started

### Prerequisites

1. **Node.js**: Download and install Node.js (includes npm).
2. **C++ Compiler**: Ensure you have a C++ compiler installed (e.g., `g++`).

### Setup Instructions

#### 1. Clone the Repository
```
git clone https://github.com/AmritanshuRaj45/sudoku_backtrack_solver.git
cd sudoku_backtrack_solver/Sudoku_solver
```
#### 2. Build the C++ Solver
Compile the C++ solver:
```
g++ -o sudoku_solver sudoku_solver.cpp
```
This creates an executable file named `sudoku_solver` (or `sudoku_solver.exe` on Windows) in the project directory.

#### 3. Install Node.js Dependencies
```
npm install express
```

#### 4. Start the Node.js Server
```
node server.js
```
The server will be available at http://localhost:3000.

### Usage
- **Play Sudoku**: Visit http://localhost:3000 and start playing immediately!
- **Select Level**: Click "New Game" and choose your desired difficulty.
- **Solve or Verify**: Use the buttons to check your solution or reveal the answer.
- **Classic Solver**: Click "Sudoku Solver from Scratch" to access the original grid-based solver.

## Demo and Screenshots

### Landing Page (Play Sudoku)

<!-- space for screenshot -->


### Level Selection and Timer

<!-- space for screenshot -->


### Playing a Puzzle (with cell coloring)

<!-- space for screenshot -->


### Solution Reveal & Legend

<!-- space for screenshot -->


### Classic Solver Page

<!-- space for screenshot -->


## Troubleshooting
- **No Solution Exists**: Ensure that the input grid is valid and follows Sudoku rules.
- **Errors**: Check server logs and make sure the C++ executable is correctly built and in the same directory as `server.js`.

## Contributing
Feel free to open issues or submit pull requests if you find any bugs or have improvements in mind!

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/AmritanshuRaj45/sudoku_backtrack_solver/blob/main/LICENSE) file for details.
