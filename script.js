const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

// Load tasks from local storage when page opens
window.onload = loadTasks;

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText, false);
  input.value = "";
  saveTasks();
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
    saveTasks();
  });

  // Task text (editable)
  const span = document.createElement("span");
  span.textContent = text;
  span.contentEditable = true;
  span.addEventListener("input", saveTasks);

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    li.classList.add("removed");
    setTimeout(() => {
      li.remove();
      saveTasks();
    }, 500);
  };

  // Append in order: checkbox → text → delete
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

  if (completed) li.classList.add("completed");

  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const span = li.querySelector("span");
    const checkbox = li.querySelector("input[type='checkbox']");
    tasks.push({
      text: span.textContent,
      completed: checkbox.checked
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}