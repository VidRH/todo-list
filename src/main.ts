import './style.css'

//structure of data schema
interface Todo {
  id:number;
  text:string;
  completed:boolean;
  formattedDate:string;
  date:number;
}

let todos:Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const dateInput = document.getElementById('date-input') as HTMLInputElement

//const errorMessage  = document.getElementById('error-message') as HTMLParagraphElement

const addTodo = (text:string,date:number):void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    date: date,
    formattedDate: new Date(date).toLocaleDateString("ja-JP", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    completed: false,
  }
  todos.push(newTodo)
  console.log(`Todo added: ${todos}}`)

  renderTodos();
}


const renderTodos = ():void => {
  //clears the current list -test later 
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'todo-item completed' : 'todo-item';
    li.innerHTML = `
      <span>${todo.text}</span>
      <p>${todo.formattedDate}</p>
      <button class="toggle-button">${todo.completed ? 'Not Done' : 'Done'}</button>
      <button class="remove-button">Remove</button>
    `
    addhighlightOverdueClass(li, todo.id);
    addRemoveButtonListener(li, todo.id);
    addToggleButtonListener(li, todo.id);
    todoList.appendChild(li)
  })
}

renderTodos();


todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  const date = dateInput.valueAsNumber;

  if (text !== '') {
    addTodo(text, date);
    todoInput.value = '' //clears the input field after adding 
    dateInput.value = ''
  }
})


const addRemoveButtonListener = (li:HTMLLIElement, id:number):void => {
  const removeButton = li.querySelector('.remove-button')
  removeButton?.addEventListener('click', () => removeTodo(id))
}

const removeTodo = (id:number):void => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}


// Option 6: Due Date for Todos:
// Add a date input field to set a due date for each todo item.
// Display the due date next to each todo item.
// Highlight overdue todos.

const addhighlightOverdueClass = (li:HTMLLIElement, id:number):void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    const currentDate = new Date();
    const dueDate = new Date(todo.date);
    if (dueDate < currentDate) {
      li.classList.add('overdue'); // Add a class to highlight overdue todos
    }
    else {
      li.classList.add('due'); // Remove the class if not overdue
    }
  }
}   

// Option 11: Add a button to toggle between light and dark modes.
// Change the app's theme based on the selected mode.


const button = document.querySelector<HTMLButtonElement>('#lightDarkMode')!


function toggleDarkMode(): void {
  const isDark = document.body.classList.toggle('dark')
  button.textContent = isDark ? 'Light mode' : 'Dark mode'
}

button.addEventListener('click', toggleDarkMode)


// Option 1: Add a button to toggle the completed status of a todo item
// Function to toggle the completed status of a todo +
// Add a button to toggle the completed status of a todo item

const addToggleButtonListener = (li:HTMLLIElement, id:number):void => {
  const toggleButton = li.querySelector('.toggle-button')
  toggleButton?.addEventListener('click', () => toggleTodo(id))
}

const toggleTodo = (id:number):void => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
    renderTodos()
  }
}

// Option 2: Add a button to clear all completed todos
// Add a button to clear all completed todos
// Function to clear all completed todos
// Add a button to toggle all todos

const clearCompletedButton = document.getElementById('clear-completed') as HTMLButtonElement

const clearCompleted = ():void => {
  todos = todos.filter(todo => !todo.completed)
  renderTodos()
}

clearCompletedButton.addEventListener('click', clearCompleted)