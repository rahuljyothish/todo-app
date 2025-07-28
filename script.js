document.addEventListener("DOMContentLoaded", () => {
  class TodoApp {
    constructor() {
      this.todoInput = document.querySelector(".todo-input");
      this.addBtn = document.querySelector(".add-btn");
      this.todoList = document.querySelector(".todo-list");
      this.taskItem = document.querySelector(".task-item");
      this.todos = [];

      this.init();
    }

    init() {
      this.addBtn.addEventListener("click", () => this.addTodo());
      this.todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.addTodo();
        }
      });

      this.loadTodos();
      this.render();
    }

    addTodo() {
      const text = this.todoInput.value.trim();
      if (text === "") return alert("enter a task");
      const todo = {
        id: Date.now(),
        text: text,
        completed: false,
      };

      this.todos.push(todo);
      this.todoInput.value = "";
      this.saveTodos();
      this.render();
    }

    toggleTodo(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveTodos();
        this.render();
      }
    }

    saveTodos() {
      try {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      } catch (error) {
        console.warn("Could not save todos to localStorage");
      }
    }

    loadTodos() {
      try {
        const saved = localStorage.getItem("todos");
        if (saved) {
          this.todos = JSON.parse(saved);
        }
      } catch (error) {
        alert("Could not load todos from localStorage");
        this.todos = [];
      }
    }

    createTodoElement(todo) {
      const li = document.createElement("li");
      li.className = "todo-item";
      li.dataset.id = todo.id;

      const textSpan = document.createElement("span");
      textSpan.className = `todo-text ${todo.completed ? "completed" : ""}`;
      textSpan.textContent = todo.text;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "todo-checkbox";
      checkbox.checked = todo.completed;
      checkbox.addEventListener("change", () => this.toggleTodo(todo.id));

      li.appendChild(textSpan);
      li.appendChild(checkbox);

      return li;
    }

    render() {
      this.todoList.innerHTML = "";

      if (this.todos.length === 0) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.textContent = "Nothing to-do!!!";
        this.todoList.appendChild(taskItem);
      } else {
        this.todos.forEach((todo) => {
          const todoElement = this.createTodoElement(todo);
          this.todoList.appendChild(todoElement);
        });
      }
    }
  }

  new TodoApp();
});

let changeColor = document.getElementById("change-color");

changeColor.addEventListener("click", () => {
  document.querySelector(".todo-form").style.backgroundColor =
    "rgba(223, 221, 221, 0.72)";
});
