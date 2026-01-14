// ===== SHUFFLE =====
export function shuffleTasks(tasks, done) {
  for (let i = tasks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [tasks[i], tasks[j]] = [tasks[j], tasks[i]];
    [done[i], done[j]] = [done[j], done[i]];
  }
}

// ===== BINGO DETECTION =====
export function detectBingo(boardSize, done) {
  const lines = [];
  const n = boardSize;

  function checkLine(indices) {
    if (indices.every(i => done[i])) {
      lines.push(indices);
    }
  }

  // rows
  for (let r = 0; r < n; r++) {
    checkLine([...Array(n)].map((_, i) => r * n + i));
  }

  // cols
  for (let c = 0; c < n; c++) {
    checkLine([...Array(n)].map((_, i) => i * n + c));
  }

  // diag TL–BR
  checkLine([...Array(n)].map((_, i) => i * n + i));

  // diag TR–BL
  checkLine([...Array(n)].map((_, i) => i * n + (n - 1 - i)));

  return lines;
}

// ===== PROGRESS =====
export function getProgress(done) {
  const completed = done.filter(Boolean).length;
  const total = done.length || 1;
  const percent = Math.round((completed / total) * 100);
  return { completed, total, percent };
}