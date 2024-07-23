import { it , describe, expect, vi, afterEach } from 'vitest';
import Store from '@/store/Store';
import { Todo } from '@/types/Todo';

const todoStore = Store();

describe('Testing store', () => {
  afterEach(() => {
    todoStore.deleteAll();
  })

  it('Initial todo list should be empty', async () =>{
    expect(todoStore.getAllTodos().value).toStrictEqual([]);
  })

  it('Add a new todo', async () => {
    const newTodo: Todo = {
      title: 'NewTodo',
      done: false
    }
    todoStore.addTodo(newTodo);
    expect(todoStore.getAllTodos().value).toContainEqual(newTodo);
  })

  it('Delete a todo', async () => {
    const newTodo: Todo = {
      title: 'NewTodo',
      done: false
    }
    todoStore.addTodo(newTodo);
    todoStore.deleteTodo(newTodo.title);
    expect(todoStore.getAllTodos().value).not.toContainEqual(newTodo);
  })

  it('Delete all todos', async () => {
    const newTodo1: Todo = {
      title: 'NewTodo 1',
      done: false
    }
    const newTodo2: Todo = {
      title: 'NewTodo 2',
      done: false
    }

    // todoStore.deleteAll();
    todoStore.addTodo(newTodo1);
    todoStore.addTodo(newTodo2);
    todoStore.deleteAll();

    expect(todoStore.getAllTodos().value).toEqual([]);
  })

  it('Delete done todos', async() => {
    const newTodo1: Todo = {
      title: 'NewTodo 1',
      done: true
    }
    const newTodo2: Todo = {
      title: 'NewTodo 2',
      done: false
    }

    // todoStore.deleteAll();
    todoStore.addTodo(newTodo1);
    todoStore.addTodo(newTodo2);
    todoStore.deleteDone();

    expect(todoStore.getAllTodos().value).not.toContainEqual(newTodo1);
    expect(todoStore.getAllTodos().value).toContainEqual(newTodo2);
  })

  it('Undo all todo', async () => {
    const newTodo1: Todo = {
      title: 'NewTodo 1',
      done: true
    }
    const newTodo2: Todo = {
      title: 'NewTodo 2',
      done: true
    }

    // todoStore.deleteAll();
    todoStore.addTodo(newTodo1);
    todoStore.addTodo(newTodo2);
    todoStore.undoAll();

    expect(todoStore.getAllTodos().value.every(todo => !todo.done )).toBeTruthy();
  })

  it('Validate todo', async () => {
    const newTodo: Todo = {
      title: 'NewTodo',
      done: true
    }

    // todoStore.deleteAll();
    todoStore.addTodo(newTodo);

    expect(todoStore.alreadyHasTodo('NewTodo')).toBeTruthy();
    expect(todoStore.alreadyHasTodo('NewTodo 1')).toBeFalsy();
  })

  it('Gets counter subtitle', async () => {
    const newTodo1: Todo = {
      title: 'NewTodo 1',
      done: true
    }
    const newTodo2: Todo = {
      title: 'NewTodo 2',
      done: false
    }
    // todoStore.deleteAll();
    todoStore.addTodo(newTodo1);
    todoStore.addTodo(newTodo2);

    expect(todoStore.getTodoSubtitle().value).toEqual('1/2 concluidos')
  })

  it('Gets all todo done message', async () => {
    const newTodo1: Todo = {
      title: 'NewTodo 1',
      done: true
    }
    const newTodo2: Todo = {
      title: 'NewTodo 2',
      done: true
    }
    todoStore.addTodo(newTodo1);
    todoStore.addTodo(newTodo2);

    expect(todoStore.getTodoSubtitle().value).toEqual('Todas as tarefas concluidas!')
  })
})
