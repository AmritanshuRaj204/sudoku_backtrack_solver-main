const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Serve play.html as landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'play.html'));
});

// Endpoint to solve Sudoku
app.post('/solve', (req, res) => {
    const grid = req.body.grid;

    // Validate input
    if (!grid || grid.length !== 81) {
        return res.status(400).send('Invalid input: Grid must be an array of 81 numbers.');
    }

    // Prepare the input for the C++ solver
    const input = grid.join(' ') + '\n';

    // Path to the compiled C++ executable
    const executablePath = path.join(__dirname, 'sudoku_solver.exe'); // Use 'sudoku_solver' on Linux/Mac

    // Execute the C++ program
    const solver = execFile(executablePath, [], (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).send('Solver error: ' + stderr);
        }

        // Process the output from the C++ program
        const output = stdout.trim();
        console.log(`C++ Output: '${output}'`);
        if (output === "No solution exists") {
            return res.json({ solvedGrid: null });
        }

        const solvedGrid = output.split(/\s+/).map(Number);
        res.json({ solvedGrid });
    });

    // Write the input grid to the C++ program
    solver.stdin.write(input);
    solver.stdin.end();
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
