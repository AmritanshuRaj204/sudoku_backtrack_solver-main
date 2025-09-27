// Vercel Serverless Function: /api/solve

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { grid } = req.body;
  if (!Array.isArray(grid) || grid.length !== 81) {
    res.status(400).json({ error: 'Grid must be an array of 81 numbers.' });
    return;
  }
  // JavaScript backtracking solver
  function canPlace(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) return false;
    }
    let boxRow = Math.floor(row / 3) * 3, boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      if (grid[(boxRow + i) * 9 + (boxCol + j)] === num) return false;
    }
    return true;
  }
  function solve(grid, idx) {
    if (idx === 81) return true;
    if (grid[idx] !== 0) return solve(grid, idx + 1);
    for (let num = 1; num <= 9; num++) {
      if (canPlace(grid, Math.floor(idx / 9), idx % 9, num)) {
        grid[idx] = num;
        if (solve(grid, idx + 1)) return true;
        grid[idx] = 0;
      }
    }
    return false;
  }
  let copy = grid.slice();
  if (solve(copy, 0)) {
    res.status(200).json({ solvedGrid: copy });
  } else {
    res.status(200).json({ solvedGrid: null });
  }
}
