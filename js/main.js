arrTaskTodo = [];
arrTaskCompleted = [];
getLocalStorage();

// Add task
var btnAddTask = document.getElementById("addItem");
btnAddTask.onclick = function () {
  var task = new Task();
  task.id = Math.random();
  task.taskName = document.querySelector("#newTask").value;
  task.status = "todo";
  const arrTaskToTal = [...arrTaskTodo, ...arrTaskCompleted];
  var arrTaskName = arrTaskToTal.map((task) => task.taskName);
  var valid = true;
  valid = validation.isCheckEmpty(task.taskName, "notiInput", "Task name");
  valid &= validation.isCheckExists(
    task.taskName,
    "notiExistsTaskName",
    "Task name",
    arrTaskName
  );
  if (!valid) {
    return;
  }
  arrTaskTodo.push(task);
  saveLocalStorage();
  renderTaskTodo(arrTaskTodo);
  document.querySelector("#newTask").value = "";
};

// Render task todo
function renderTaskTodo(arrTask) {
  var contentHtml = "";
  arrTask.map((task) => {
    contentHtml += `
        <li>
            <span>${task.taskName}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask(${task.id}, '${task.status}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="updateTask(${task.id}, 'completed')">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
    `;
  });
  document.getElementById("todo").innerHTML = contentHtml;
}

function renderTaskComplete(arrTask) {
  var contentHtml = "";
  arrTask.map((task) => {
    contentHtml += `
        <li>
            <span>${task.taskName}</span>
            <div class="buttons">
                <button class="remove" onclick="deleteTask(${task.id}, '${task.status}')">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" onclick="updateTask(${task.id}, 'todo')">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
    `;
  });
  document.getElementById("completed").innerHTML = contentHtml;
}

// Update task
function updateTask(taskId, status) {
  if (status === "completed") {
    arrTaskTodo.findIndex((task, index) => {
      if (task?.id === Number(taskId)) {
        const taskObject = {
          id: task.id,
          taskName: task.taskName,
          status: "completed",
        };
        arrTaskTodo.splice(index, 1);
        arrTaskCompleted.push(taskObject);
      }
      saveLocalStorage();
      renderTaskTodo(arrTaskTodo);
      renderTaskComplete(arrTaskCompleted);
    });
  } else if (status === "todo") {
    arrTaskCompleted.findIndex((task, index) => {
      if (task?.id === Number(taskId)) {
        const taskObject = {
          id: task.id,
          taskName: task.taskName,
          status: "todo",
        };
        arrTaskCompleted.splice(index, 1);
        arrTaskTodo.push(taskObject);
      }
      saveLocalStorage();
      renderTaskTodo(arrTaskTodo);
      renderTaskComplete(arrTaskCompleted);
    });
  }
}

// Delete task
function deleteTask(taskId, status) {
  if (status === "todo") {
    var index = arrTaskTodo.findIndex((task) => task.id === Number(taskId));
    arrTaskTodo.splice(index, 1);
    saveLocalStorage();
    renderTaskTodo(arrTaskTodo);
  }
  var index = arrTaskCompleted.findIndex((task) => task.id === Number(taskId));
  arrTaskCompleted.splice(index, 1);
  saveLocalStorage();
  renderTaskComplete(arrTaskCompleted);
}

// Save local storage
function saveLocalStorage() {
  var stringArrTaskTodo = JSON.stringify(arrTaskTodo);
  var stringArrTaskCompleted = JSON.stringify(arrTaskCompleted);

  // save
  localStorage.setItem("arrTaskTodo", stringArrTaskTodo);
  localStorage.setItem("arrTaskCompleted", stringArrTaskCompleted);
}

// Get data by local storage
function getLocalStorage() {
  if (localStorage.getItem("arrTaskTodo")) {
    var stringTaskTodo = localStorage.getItem("arrTaskTodo");
    arrTaskTodo = JSON.parse(stringTaskTodo);
    renderTaskTodo(arrTaskTodo);
  }
  if (localStorage.getItem("arrTaskCompleted")) {
    var stringTaskCompleted = localStorage.getItem("arrTaskCompleted");
    arrTaskCompleted = JSON.parse(stringTaskCompleted);
    renderTaskComplete(arrTaskCompleted);
  }
}
