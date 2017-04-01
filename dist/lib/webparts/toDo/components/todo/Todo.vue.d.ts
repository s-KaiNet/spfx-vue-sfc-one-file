import * as Vue from 'vue';
import { ITodoWebPartProps } from '../../ITodoWebPartProps';
export default class Todo extends Vue implements ITodoWebPartProps {
    message: string;
    todos: string[];
    mytodos: string[];
    todoTitle: string;
    addTodo(): void;
    completed(todo: string): void;
}
