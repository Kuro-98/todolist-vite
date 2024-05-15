import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
	TodoList: '.todo-list',
	NewTodoInput: '#new-todo-input',
	DeleteTodo: '.destroy',
};

/**
 *
 * @param {String} elementId
 */

export const App = (elementId) => {
	const displayTodos = () => {
		const todos = todoStore.getTodos(todoStore.getCurrentFilter());
		renderTodos(ElementIDs.TodoList, todos);
	};

	(() => {
		const app = document.createElement('div');
		app.innerHTML = html;
		document.querySelector(elementId).appendChild(app);
		displayTodos();
	})();

	const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
	const todoListUL = document.querySelector(ElementIDs.TodoList);

	newDescriptionInput.addEventListener('keyup', (event) => {
		if (event.keyCode !== 13) return;
		if (event.target.value.trim().length === 0) return;
		todoStore.addTodo(event.target.value);
		event.target.value = '';
		displayTodos();
	});

	todoListUL.addEventListener('click', (event) => {
		const element = event.target.closest('[data-id]');
		todoStore.toggleTodo(element.getAttribute('data-id'));
		displayTodos();
	});

	todoListUL.addEventListener('click', (event) => {
		if (!event.target.classList.contains('destroy')) return;
		const element = event.target.parentElement.parentElement.getAttribute('data-id');
		todoStore.deleteTodo(element);
		displayTodos();
	});
};
