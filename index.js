let todos = [];//array todos - está inicialmente vacío

window.addEventListener("load", function() { //el evento se dispara cuando la web se ha terminado de cargar. Ejecuta varias acciones:
  todos = JSON.parse(localStorage.getItem("todos")) || []; //Obtención de datos del localstorage: Se obtiene el valor almacenado en la clave "todos" en el almacenamiento local mediante localStorage.getItem. Si no hay datos almacenados, se asigna un array vacío a la variable todos.
  const nameInput = document.querySelector("#name"); //Selección de elementos del DOM: Se obtienen referencias a los elementos HTML mediante document.querySelector para el input con id "name" y el formulario con id "new-todo-form".
  const newTodoForm = document.querySelector("#new-todo-form");

  const username = localStorage.getItem("username") || ""; //trae del localstorage el nombre de usuario

  //Cuando se produce un cambio en el valor del input de nombre, se almacena el valor en el almacenamiento local utilizando localStorage.setItem.
  nameInput.addEventListener("change", (e) => { 
    localStorage.setItem("username", e.target.value);
  });

  //Cuando se envía el formulario de nueva tarea, entonces se ejecuta la función asociada a evento. Dentro de esta función se evita el comportamiento predeterminado de recargar con preventDefault
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
//Se crea un objeto todo que representa la nueva tarea, con los valores que obtiene del formulario
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      crateAt: new Date().getTime(),
    };
//Se añade el objeto con la tarea al array todos
    todos.push(todo);
//Se almacena en el localstorage
    localStorage.setItem("todos", JSON.stringify(todos));
//Se resetea el formulario
    e.target.reset();
//Se llama a la función para actualizar la lista de tareas
    DisplayTodos();
  });

  DisplayTodos();
});

//Esta función se encarga de actualizr la lista de tareas en el DOM
function DisplayTodos() {
    //obtiene la referencia al DOM
  const todoList = document.querySelector("#todo-list");
    //Se vacía del contenido anterior 
  todoList.innerHTML = "";
    //recorre el array y crea elementos para cada tarea
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "personal") {
      span.classList.add("personal");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo.content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly> `;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";
    
    //Añade al dom los elementos creados
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
        todoItem.classList.add('done');

    }
    input.addEventListener("click", e => {
        todo.done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));

        if (todo.done) {
            todoItem.classList.add('done');
        } else {
            todo.Item.classList.remove('done');
        }
        DisplayTodos();
    })

    edit.addEventListener("click", e => {
        const input = content.querySelector('input');
        input.removeAttribute('readonly');
        input.focus();
        input.addEventListener('blur', e => {
            input.setAttribute('readonly', true);
            todo.content = e.target.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })

    })

    deleteButton.addEventListener('click', e => {
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
    })
  });
}

module.exports = DisplayTodos;
