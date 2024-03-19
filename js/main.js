

const tasksList = document.querySelector("#task-list");
const newTaksInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");

const tasks = [];

const app = {
  tasks: tasks,
  tasksList: tasksList,
  newTaksInput: newTaksInput
};



window.onload = function () {
  const savedTasks =  JSON.parse(localStorage.getItem("tasks")) || [];
  app.tasks = savedTasks.map((task)=>{
    return createTask(task.title, task.isCompleted)
  });

  app.tasks.forEach((task)=>{
    return addTaskToList(task, app.tasksList);
  });
}

function saveTaskLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(title, isCompleted = false) {
  return{
    id: Date.now(),
    title: title,
    isCompleted: isCompleted
  }  
};


function addTaskToList(task, taskList) {
  const taskElement = createTaskElement(task);
  taskList.appendChild(taskElement);
  
};

function addTasks(app){
  const newTaskTitle = app.newTaksInput.value;
  const newTask = createTask(newTaskTitle)
  app.tasks.push(newTask)

  addTaskToList(newTask, app.tasksList)
  saveTaskLocalStorage(app.tasks)
  app.newTaksInput.value = "";
}

function createTaskElement(task) {

  const taskElement = document.createElement("li");

  const taskCheckbox = document.createElement("input")
  taskCheckbox.type= "checkbox"
  taskCheckbox.checked = task.isCompleted;

  taskCheckbox.addEventListener("change", ()=>{
    task.isCompleted = taskCheckbox.checked;
    taskText.classList.toggle("completed", task.isCompleted)
    saveTaskLocalStorage(app.tasks)
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toggle("completed", task.isCompleted)

  const taskDeleteButton = document.createElement("button")
  taskDeleteButton.textContent = "Eliminar";
  taskDeleteButton.className = "delete-button";


  // Eliminar la tarea de la lista
  taskDeleteButton.addEventListener("click", ()=>{

    taskElement.remove()
    const taskIndex = app.tasks.indexOf(task);
    if (taskIndex > -1) {
      app.tasks.splice(taskIndex, 1)
    }
    saveTaskLocalStorage(app.tasks)
  });

  taskElement.appendChild(taskCheckbox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(taskDeleteButton);


  return taskElement;
}

addTaskButton.addEventListener("click", ()=>{
  addTasks(app)
})

newTaksInput.addEventListener("keydown", (event)=>{
  if (event.key === "Enter") {
    addTasks(app)
  }
})


