import { Todo } from "@/types/Todo";
import { computed, reactive } from "vue";
import { todoMock } from "@/utils/TodoMock";

interface Store {
  todoList: Todo[]
}

const todoStore = reactive<Store>(todoMock());

export default () => {
  const getAllTodos = () => {
    return computed(() => todoStore.todoList)
  }

  const addTodo = (todo: Todo) => {
    todoStore.todoList.push(todo);
  }


  const deleteTodo = (title: String) => {
    todoStore.todoList = todoStore.todoList.filter(t => t.title !== title);
  }

  const deleteAll = () => {
    todoStore.todoList = [];
  }

  const deleteDone = () => {
    todoStore.todoList =  todoStore.todoList.filter(t=> !t.done)
  }

  const getTodoSubtitle = () => {
    return computed(() => {
      const done = todoStore.todoList.filter((todo) => todo.done === true).length
      const total = todoStore.todoList.length
      if(done === total &&  total > 0){
        return 'Todas as tarefas concluidas!'

      } else if(done < total){
        return `${todoStore.todoList.filter((todo) => todo.done === true).length}/${todoStore.todoList.length} concluidos`
      } else {
        return 'Nenhuma tarefa cadastrada!'
      }
    })
  }

  const alreadyHasTodo = (title: String) => {
    return todoStore.todoList.some((item) => item.title === title)
  }

  const undoAll = () => {
    todoStore.todoList.forEach((todo) => todo.done = false)
  }

  return {
    getAllTodos,
    addTodo,
    deleteTodo,
    deleteAll,
    undoAll,
    deleteDone,
    getTodoSubtitle,
    alreadyHasTodo
  }
}
