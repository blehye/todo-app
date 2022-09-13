window.onload = function () {
  const inputForm = document.querySelector("#input-form");
  const todoList = document.querySelector(".todo-list");
  const updateMyTodoInput = document.querySelector(".update-my-todo-input");
  const todoListControl = document.querySelector(".todo-list-control");
  const myTodoInput = document.querySelector("#my-todo-input").value;
  let todoArray = [];

  inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    todoArray.push(myTodoInput);
    console.log(myTodoInput);
    paintTodo(myTodoInput);
    console.log("1");
    localStorage.setItem("todoList", JSON.stringify(todoArray));
    console.log("2");
    const savedTodoList = localStorage.getItem("todoList");
    if (savedTodoList) {
      const parsedTodoList = JSON.parse(savedTodoList);
      parsedTodoList.forEach(paintTodo);
    }
  });

  function paintTodo(newTodo) {
    console.log("아니이게왜");
    const li = document.createElement("li");
    const div = document.createElement("div");
    todoList.appendChild(li);
    const lastLi = todoList.querySelector("li:last-child");
    lastLi.classList.add("todo-form", "border-bottom");
    lastLi.appendChild(document.createElement("div"));

    lastLi.appendChild(document.createElement("div"));

    lastLi.appendChild(document.createElement("div"));

    const checkBtnAreaDiv = lastLi.querySelector("div:nth-child(1)");

    checkBtnAreaDiv.appendChild(document.createElement("div"));

    const checkBtnDiv = checkBtnAreaDiv.querySelector("div");
    checkBtnDiv.classList.add("check-btn");
    const updateMyTodoInputDiv = lastLi.querySelector("div:nth-child(2)");
    const crossBtnAreaDiv = lastLi.querySelector("div:nth-child(3)");
    checkBtnAreaDiv.classList.add("check-btn-area");
    updateMyTodoInputDiv.classList.add(
      "update-my-todo-input",
      "todo-input",
      "align-items-center"
    );
    crossBtnAreaDiv.classList.add(
      "cross-btn-area",
      "align-items-center",
      "hidden"
    );
    const crossImg = crossBtnAreaDiv.appendChild(document.createElement("img"));
    crossImg.src = "./images/icon-cross.svg";
    document.querySelector("#my-todo-input").value = "";
    updateMyTodoInputDiv.innerHTML = newTodo;

    const firstList = todoList.querySelector("li:first-child");
    firstList.classList.add("border-radius-top");

    todoListControl.classList.remove("hidden");

    let list = todoList.querySelectorAll("li");
    for (let i = 0; i < list.length; i++) {
      const crossBtnAreaDiv = list[i].querySelector("div:nth-child(3)");
      list[i].addEventListener("mouseover", function () {
        crossBtnAreaDiv.classList.remove("hidden");
      });
      list[i].addEventListener("mouseout", function () {
        crossBtnAreaDiv.classList.add("hidden");
      });
    }
  }
};
