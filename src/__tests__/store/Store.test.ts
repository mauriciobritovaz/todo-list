import { it , describe, expect, vi, afterEach, beforeEach, } from 'vitest';
import Store from '@/store/Store';
import { Todo } from '@/types/Todo';

vi.mock("@/utils/TodoMock", () => ({
  todoMock: vi.fn(() => ({
    todoList: [
      { title: "Mocked Todo 1", done: false },
      { title: "Mocked Todo 2", done: true },
    ],
  })),
}));


describe('Testing store', () => {
  let todoStore : ReturnType<typeof Store>;

  beforeEach(() => {
    todoStore = Store();
  })

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  })

  it('Initial todo list should be empty', async () =>{
    expect(todoStore.getAllTodos().value.length).toBe(2);
  })

  it('Add a new todo', async () => {
    const newTodo: Todo = {
      title: 'NewTodo',
      done: false
    }
    todoStore.addTodo(newTodo);
    expect(todoStore.getAllTodos().value).toContainEqual(newTodo);
    expect(todoStore.getAllTodos().value.length).toBe(3);
  })

  it('Delete a todo', async () => {
    const toDelete = 'NewTodo'
    todoStore.deleteTodo(toDelete);
    expect(todoStore.getAllTodos().value.find((todo) =>  todo.title === toDelete)).toBeUndefined();
  })

  it('Delete all todos', async () => {
    todoStore.deleteAll();

    expect(todoStore.getAllTodos().value).toEqual([]);
  })

  it('Undo all todo', async () => {
    todoStore.undoAll();
    const isAllUndone = todoStore.getAllTodos().value.every((todo) => !todo.done);

    expect(isAllUndone).toBe(true);
  })

  it('Delete done todos', async() => {
    todoStore.deleteDone();

    expect(todoStore.getAllTodos().value.some((todo) => todo.done)).toBe(false);
  })

  it('Validate todo', async () => {
    expect(todoStore.getAllTodos().value).toEqual([])
    const newTodo: Todo = {
      title: 'Mocked Todo 1',
      done: false
    }
    todoStore.addTodo(newTodo);
    expect(todoStore.alreadyHasTodo('Mocked Todo 1')).toBeTruthy();
    expect(todoStore.alreadyHasTodo('NewTodo')).toBeFalsy();
  })

  it('Gets counter subtitle', async () => {
    expect(todoStore.getTodoSubtitle().value).toEqual('0/1 concluidos')
  })

  it('Gets all todo done message', async () => {
    todoStore.deleteAll()
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
