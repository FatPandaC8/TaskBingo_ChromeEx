import {
  saveState,
  loadState,
  createEmptyTasks,
  createEmptyDone
} from "./storage.js";
import { shuffleTasks } from "./logic.js";
import { renderGrid, renderStats } from "./ui.js";

// DOM
const gridElement       = document.getElementById("grid");
const sizeInput         = document.getElementById("size");
const generateButton    = document.getElementById("generate");
const resetButton       = document.getElementById("reset");
const shuffleButton     = document.getElementById("shuffle");

const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const darkModeToggle = document.getElementById("darkModeToggle");

const progressText      = document.getElementById("progressText");
const progressPercent   = document.getElementById("progressPercent");

// STATE
let boardSize = 5;
let tasks = [];
let done = [];

// === STATE SYNC HANDLER ===
function stateChanged() {
  saveState(boardSize, tasks, done);
  renderGrid(boardSize, tasks, done, gridElement, stateChanged);
  renderStats(done, progressText, progressPercent);
}

generateButton.addEventListener("click", () => {
  boardSize = Math.max(2, Math.min(7, parseInt(sizeInput.value)));

  tasks = createEmptyTasks(boardSize);
  done = createEmptyDone(boardSize);

  stateChanged();
});

resetButton.addEventListener("click", () => {
  tasks = createEmptyTasks(boardSize);
  done = createEmptyDone(boardSize);
  stateChanged();
});

shuffleButton.addEventListener("click", () => {
  shuffleTasks(tasks, done);
  stateChanged();
});

settingsBtn.addEventListener("click", () => {
  settingsPanel.classList.toggle("hidden");
});

darkModeToggle.addEventListener("change", () => {
  const enabled = darkModeToggle.checked;

  document.body.classList.toggle("dark", enabled);

  chrome.storage.sync.set({ darkMode: enabled });
});

// INITIAL LOAD
loadState((size, t, d) => {
  boardSize = size;
  tasks = t;
  done = d;

  sizeInput.value = boardSize;

  stateChanged();
});