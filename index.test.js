const DisplayTodos = require('./index');

describe('Lista de tareas', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="todo-list"></div>
    `;
  });

  test('En la lista aparecen las tareas', () => {
    const todos = [
      {
        content: 'Tarea 1',
        category: 'personal',
        done: false,
        createdAt: new Date().getTime(),
      },

    ];

    // Fase de ejecución
    DisplayTodos(todos);

    // Fase de verificación
    const todoList = document.querySelector('#todo-list');
    expect(todoList.children.length).toBe(1);
  });
});
