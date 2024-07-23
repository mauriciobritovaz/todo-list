<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Todo List</VCardTitle>
      <VCardSubtitle> {{ todoSubtitle }} </VCardSubtitle>
      <AddTodo />
    </VCardItem>
    <template v-if="todos.length">
      <TodoList :todos="todos"/>
      <VCardActions>
        <TodoActions />
      </VCardActions>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import AddTodo from './AddTodo.vue';
import TodoList from './TodoList.vue'
import TodoActions from './TodoActions.vue'
import Store from '@/store/Store';

const { getAllTodos, getTodoSubtitle } = Store();

const todoSubtitle = getTodoSubtitle();

const todos = getAllTodos();

</script>

<style scoped>

</style>
