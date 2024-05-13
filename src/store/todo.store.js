import { Todo } from '../todos/models/todo.model';

const Filters = {
	All: 'all',
	Completed: 'completed',
	Pending: 'pending',
};

const state = {
	todos: [new Todo('Learn JavaScript'), new Todo('Learn TypeScript'), new Todo('Learn Angular')],
	filter: Filters.All,
};

const initStore = () => {
	console.log(state);
	console.log('initStore 😎');
};

const loadStrore = () => {
	throw new Error('Not implemented');
};

const addTodo = (description) => {
	const newTodo = new Todo(description);
	state.todos.push(newTodo);
};

export default {
	initStore,
	loadStrore,
};
