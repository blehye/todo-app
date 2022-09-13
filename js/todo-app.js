window.onload = function () {
  const inputForm = document.querySelector("#input-form");
  const todoList = document.querySelector(".todo-list");
  const updateMyTodoInput = document.querySelector(".update-my-todo-input");
  const todoListControl = document.querySelector(".todo-list-control");
  const myTodoInput = document.querySelector("#my-todo-input");
  const deleteBtn = document.querySelector(".cross-btn-area img");
  let todoArray = [];

  //localStorage 에 투두 저장
  function saveToDos() {
    localStorage.setItem("todoList", JSON.stringify(todoArray));
  }

  function deleteToDo(event) {
    const li = event.target.parentElement.parentElement;
    li.remove();
    todoArray = todoArray.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }

  function paintTodo(newTodoObject) {
    const li = document.createElement("li");
    li.id = newTodoObject.id;
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
    // document.querySelector("#my-todo-input").value = "";
    updateMyTodoInputDiv.innerHTML = newTodoObject.text;

    const firstList = todoList.querySelector("li:first-child");
    firstList.classList.add("border-radius-top");

    todoListControl.classList.remove("hidden");

    let list = todoList.querySelectorAll("li");
    for (let i = 0; i < list.length; i++) {
      const crossBtnAreaDiv = list[i].querySelector("div:nth-child(3)");
      list[i].addEventListener("mouseover", function () {
        crossBtnAreaDiv.classList.remove("hidden");
        crossBtnAreaDiv.addEventListener("click", deleteToDo);
      });
      list[i].addEventListener("mouseout", function () {
        crossBtnAreaDiv.classList.add("hidden");
      });
    }
  }

  function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = myTodoInput.value;
    myTodoInput.value = "";
    const newTodoObject = {
      text: newTodo,
      id: Date.now(), //랜덤한 id 만들기
    };
    todoArray.push(newTodoObject);
    paintTodo(newTodoObject);
    saveToDos();
  }

  //input을 submit할때의 이벤트
  inputForm.addEventListener("submit", handleToDoSubmit);

  const savedTodoList = localStorage.getItem("todoList");
  if (savedTodoList !== null) {
    const parsedTodoList = JSON.parse(savedTodoList);
    todoArray = parsedTodoList;
    parsedTodoList.forEach(paintTodo);
  }
};
