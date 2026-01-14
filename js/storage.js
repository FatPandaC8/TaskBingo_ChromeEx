export function saveState(boardSize, tasks, done) {
  chrome.storage.sync.set({
    boardSize,
    tasks,
    done
  });
}

export function loadState(callback) {
  chrome.storage.sync.get(["boardSize", "tasks", "done"], (data) => {
    const size = data.boardSize || 5;
    const tasks = data.tasks || createEmptyTasks(size);
    const done = data.done || createEmptyDone(size);

    callback(size, tasks, done);
  });
}

// helpers live here because they relate to persistence

export function createEmptyTasks(n) {
  return Array(n * n).fill("Right-click to edit");
}

export function createEmptyDone(n) {
  return Array(n * n).fill(false);
}

chrome.storage.sync.get(["darkMode"], data => {
  if (data.darkMode) {
    document.body.classList.add("dark");
    darkModeToggle.checked = true;
  }
});