import { Todo } from '../todos/models/todo.model';

export const Filters = {
	All: 'all',
	Completed: 'completed',
	Pending: 'pending',
};

const state = {
	todos: [new Todo('Learn JavaScript'), new Todo('Learn TypeScript'), new Todo('Learn Angular')],
	filter: Filters.All,
};

const initStore = () => {
	loadStore();
	console.log('initStore 😎');
};

const loadStore = () => {
	if (!localStorage.getItem('state')) return;
	const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
	state.todos = todos;
	state.filter = filter;
};

const saveStateToLocalStorage = () => {
	localStorage.setItem('state', JSON.stringify(state));
	// localStorage.setItem('state', 'Hola mundo');
};

const getTodos = (filter = Filters.All) => {
	switch (filter) {
		case Filters.All:
			return [...state.todos];
		case Filters.Completed:
			return state.todos.filter((todo) => todo.done);
		case Filters.Pending:
			return state.todos.filter((todo) => !todo.done);
		default:
			throw new Error(`Option ${filter} is not valid.`);
	}
};

/**
 *
 * @param {String} description
 */

const addTodo = (description) => {
	if (!description) throw new Error('Description is required');
	const newTodo = new Todo(description);
	state.todos.push(newTodo);
	saveStateToLocalStorage();
};

/**
 *
 * @param {String} todoId Todo identifier
 */
const toggleTodo = (todoId) => {
	state.todos = state.todos.map((todo) => {
		if (todo.id === todoId) {
			todo.done = !todo.done;
		}
		return todo;
	});
	saveStateToLocalStorage();
	console.log(state);
};

const deleteTodo = (todoId) => {
	state.todos = state.todos.filter((todo) => todo.id !== todoId);
	saveStateToLocalStorage();
};

const deleteCompleted = () => {
	console.log(state.todos);
	state.todos = state.todos.filter((todo) => !todo.done);
	saveStateToLocalStorage();
};

/**
 *
 * @param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
	state.filter = newFilter;
	saveStateToLocalStorage();
};

const getCurrentFilter = () => {
	return state.filter;
};

export default {
	addTodo,
	deleteCompleted,
	deleteTodo,
	getCurrentFilter,
	initStore,
	getTodos,
	loadStore,
	setFilter,
	toggleTodo,
};
