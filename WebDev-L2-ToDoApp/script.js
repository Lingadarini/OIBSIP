const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function render() {
  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  pendingCount.textContent = `${pending.length} pending`;
  completedCount.textContent = `${completed.length} completed`;

  pendingEmpty.style.display = pending.length === 0 ? "block" : "none";
  completedEmpty.style.display = completed.length === 0 ? "block" : "none";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");

    const top = document.createElement("div");
    top.className = "task-top";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️";
    editBtn.addEventListener("click", () => editTask(task.id, li));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "🗑️";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    top.appendChild(checkbox);
    top.appendChild(text);
    top.appendChild(actions);

    const timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = task.completed
      ? `Completed: ${formatTime(task.completedAt)}`
      : `Added: ${formatTime(task.createdAt)}`;

    li.appendChild(top);
    li.appendChild(timestamp);

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      pendingList.appendChild(li);
    }
  });
}

function addTask() {
  const value = taskInput.value.trim();
  if (value === "") return;

  tasks.push({
    id: Date.now(),
    text: value,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null
  });

  taskInput.value = "";
  saveTasks();
  render();
}

function toggleComplete(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      const completed = !task.completed;
      return {
        ...task,
        completed,
        completedAt: completed ? new Date().toISOString() : null
      };
    }
    return task;
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  render();
}

function editTask(id, li) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const top = li.querySelector(".task-top");
  top.innerHTML = "";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = task.text;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.addEventListener("click", () => saveEdit(id, input.value));

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") saveEdit(id, input.value);
  });

  top.appendChild(input);
  top.appendChild(saveBtn);
  input.focus();
}

function saveEdit(id, newText) {
  const trimmed = newText.trim();
  if (trimmed === "") return;

  tasks = tasks.map(task =>
    task.id === id ? { ...task, text: trimmed } : task
  );
  saveTasks();
  render();
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

render();