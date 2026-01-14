import { getProgress, detectBingo } from "./logic.js";

export function renderGrid(boardSize, tasks, done, container, onChange) {
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

  const bingoLines = detectBingo(boardSize, done);

  for (let i = 0; i < tasks.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = tasks[i];

    if (done[i]) cell.classList.add("done");

    if (bingoLines.some(line => line.includes(i))) {
      cell.classList.add("bingo-line");
    }

    // toggle done
    cell.addEventListener("click", () => {
      done[i] = !done[i];
      onChange();
    });

    // right-click edit
    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const newText = prompt("Edit task:", tasks[i]);
      if (newText && newText.trim() !== "") {
        tasks[i] = newText.trim();
        onChange();
      }
    });

    // drag-and-drop
    enableDragAndDrop(cell, i, tasks, done, onChange);

    container.appendChild(cell);
  }
}

// ===== DRAG & DROP =====
function enableDragAndDrop(cell, index, tasks, done, onChange) {
  let dragSourceIndex = null;

  cell.draggable = true;

  cell.addEventListener("dragstart", () => {
    dragSourceIndex = index;
  });

  cell.addEventListener("dragover", (e) => e.preventDefault());

  cell.addEventListener("drop", () => {
    [tasks[index], tasks[dragSourceIndex]] = [tasks[dragSourceIndex], tasks[index]];
    [done[index], done[dragSourceIndex]] = [done[dragSourceIndex], done[index]];
    onChange();
  });
}

// ===== STATS RENDER =====
export function renderStats(done, textElem, percentElem) {
  const { completed, total, percent } = getProgress(done);

  textElem.textContent = `${completed} / ${total}`;
  percentElem.textContent = `${percent}%`;
}