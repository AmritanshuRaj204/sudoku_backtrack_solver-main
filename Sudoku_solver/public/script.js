document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('keydown', function(event) {
            const currentCell = event.target;
            const index = Array.from(cells).indexOf(currentCell);

            switch (event.key) {
                case 'ArrowUp':
                    focusCell(index - 9); // Move up
                    break;
                case 'ArrowDown':
                    focusCell(index + 9); // Move down
                    break;
                case 'ArrowLeft':
                    focusCell(index - 1); // Move left
                    break;
                case 'ArrowRight':
                    focusCell(index + 1); // Move right
                    break;
                default:
                    // Allow only single digits and control keys
                    if (!['Backspace', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && !/^[1-9]$/.test(event.key)) {
                        event.preventDefault();
                    }
            }
        });

        cell.addEventListener('input', function(event) {
            const currentCell = event.target;
            const value = currentCell.value;

            // Allow only single digit values
            if (value.length > 1 || !/^[1-9]?$/.test(value)) {
                currentCell.value = value.slice(0, 1); // Keep only the first character
            }

            if (value) {
                currentCell.style.backgroundColor = '#fffacd'; // Light yellow for user-input cells
            } else {
                currentCell.style.backgroundColor = ''; // Reset background color if input is cleared
            }
        });
    });

    function focusCell(newIndex) {
        if (newIndex >= 0 && newIndex < cells.length) {
            cells[newIndex].focus();
        }
    }

    document.getElementById('sudoku-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Collect grid data from input fields
        const grid = [];
        for (let i = 0; i < 81; i++) {
            const cell = document.getElementById(`cell-${i}`).value;
            grid.push(cell ? parseInt(cell) : 0);
        }

        // Send grid data to backend
        fetch('/api/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ grid })
        })
        .then(response => response.json())
        .then(data => {
            if (data.solvedGrid) {
                // Display solved grid directly in the grid cells
                data.solvedGrid.forEach((value, index) => {
                    if (!cells[index].value) {
                        cells[index].value = value;
                        cells[index].style.backgroundColor = '#d3ffd3'; // Green background for solver cells
                    }
                });
            } else {
                // Display message when no solution exists
                alert('No solution exists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while solving the puzzle.');
        });
    });

    document.getElementById('reset-button').addEventListener('click', function() {
        cells.forEach(cell => {
            cell.value = '';
            cell.style.backgroundColor = ''; // Reset background color
        });
    });
});

// Generate Sudoku grid input fields
const gridContainer = document.getElementById('sudoku-grid');

for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell';
    input.maxLength = 1; // Limit input to a single character
    input.pattern = '[1-9]';
    input.title = 'Enter a single digit from 1 to 9'; // Tooltip for user guidance
    input.id = `cell-${i}`;
    gridContainer.appendChild(input);
}
