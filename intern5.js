// Get the form, input, and ul elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Function to load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task);
  });
}

// Function to save tasks to local storage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''}>
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
  `;
  todoList.appendChild(li);

  // Add event listener to the checkbox
  const checkbox = li.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks(tasks);
    li.classList.toggle('completed');
  });

  // Add event listener to the delete button
  const deleteButton = li.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    li.remove();
    tasks.splice(tasks.indexOf(task), 1);
    saveTasks(tasks);
  });
}

// Function to add a new task
function addTask(taskText) {
  const task = {
    text: taskText,
    completed: false
  };
  createTaskElement(task);
  tasks.push(task);
  saveTasks(tasks);
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = '';
  }
});

// Load tasks from local storage when the page loads
const tasks = [];
loadTasks();
