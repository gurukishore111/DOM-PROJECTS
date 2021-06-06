//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event Listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  clearBtn.addEventListener("click", clearTask);
  filter.addEventListener("input", filterTask);
}

//Add Task & Remove Task
function addTask(e) {
  if (taskInput.value === "") {
    return alert("Add a task");
  }
  //Create li elements
  const listElements = document.createElement("li");
  //Add class
  listElements.className = "collection-item";
  //Create text node and append to li
  listElements.appendChild(document.createTextNode(taskInput.value));
  //Create New Link elements
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  //Add icon html
  link.innerText = `❌`;
  //Append the link to list Elements
  listElements.appendChild(link);
  //   console.log(listElements);
  taskList.appendChild(listElements);
  //Remove Task
  link.addEventListener("click", () => {
    if (confirm("Are you sure to delete this item ? ")) {
      removeTaskFromLS(listElements);
      listElements.remove();
    }
  });
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value = "";
  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((item) => {
    const listElements = document.createElement("li");
    //Add class
    listElements.className = "collection-item";
    //Create text node and append to li
    listElements.appendChild(document.createTextNode(item));
    //Create New Link elements
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    //Add icon html
    link.innerText = `❌`;
    //Append the link to list Elements
    listElements.appendChild(link);
    //   console.log(listElements);
    taskList.appendChild(listElements);
    link.addEventListener("click", () => {
      if (confirm("Are you sure to delete this item ? ")) {
        removeTaskFromLS(listElements);
        listElements.remove();
      }
    });
  });
}

function clearTask(e) {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
}

function removeTaskFromLS(taskItem) {
  console.log(taskItem.textContent);
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach((task, index) => {
    const value = task.replace("❌", "");
    const textValue = taskItem.textContent.replace("❌", "");
    // console.log(value, "ccc");/
    if (textValue === value) {
      console.log(task, "ccc");
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTask(e) {
  const textValue = e.target.value.toLowerCase();
  console.log(taskList.childNodes);
  document.querySelectorAll(".collection-item").forEach((item) => {
    const currentItem = item.firstChild.textContent;
    if (currentItem.toLowerCase().indexOf(textValue) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
