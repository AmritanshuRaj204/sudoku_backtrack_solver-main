#include <iostream>

#define N 9

bool isSafe(int grid[N][N], int row, int col, int num, bool checkSelf = true) {
    for (int x = 0; x < N; x++) {
        if ((grid[row][x] == num && x != col) || (grid[x][col] == num && x != row)) {
            return false;
        }
    }

    int startRow = row - row % 3, startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (grid[i + startRow][j + startCol] == num && (i + startRow != row || j + startCol != col)) {
                return false;
            }
        }
    }

    return true;
}

bool solveSudoku(int grid[N][N], int row, int col) {
    if (row == N - 1 && col == N) {
        return true;
    }

    if (col == N) {
        row++;
        col = 0;
    }

    if (grid[row][col] != 0) {
        return solveSudoku(grid, row, col + 1);
    }

    for (int num = 1; num <= 9; num++) {
        if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid, row, col + 1)) {
                return true;
            }
        }
        grid[row][col] = 0;
    }
    return false;
}

bool isValidSudoku(int grid[N][N]) {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            if (grid[row][col] != 0 && !isSafe(grid, row, col, grid[row][col], false)) {
                return false;
            }
        }
    }
    return true;
}

int main() {
    int grid[N][N];

    // Read grid from standard input
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            std::cin >> grid[i][j];
        }
    }

    if (!isValidSudoku(grid)) {
        std::cout << "No solution exists" << std::endl;
        return 0;
    }

    // Solve the Sudoku puzzle
    if (solveSudoku(grid, 0, 0)) {
        // Output the solved grid
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                std::cout << grid[i][j] << " ";
            }
            std::cout << std::endl;
        }
    } else {
        std::cout << "No solution exists" << std::endl;
    }

    return 0;
}
