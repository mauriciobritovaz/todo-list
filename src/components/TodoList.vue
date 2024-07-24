<template>
  <VList density="compact" lines="one">
    <VListItem
      v-for="todo in props.todos"
      :key="todo.title"
      :value="todo.title"
    >
      <template v-slot:prepend>
        <VListItemAction start>
          <VCheckboxBtn v-model="todo.done" :label="todo.title" data-testid="checkTodo" />
        </VListItemAction>
      </template>
      <template v-slot:append>
        <VListItemAction end>
          <VBtn
            color="grey-lighten-1"
            icon="mdi-close"
            variant="text"
            @click="handleDelete(todo.title)"
            data-testid="deleteTodo"
          ></VBtn>
        </VListItemAction>
      </template>
    </VListItem>
  </VList>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Todo } from '@/types/Todo';
import Store from '@/store/Store';

const {deleteTodo} = Store();

const props = defineProps({
  todos:{
    type: Array as () => Todo[],
    required: true
  }
})

const handleDelete =(title: String) => {
  deleteTodo(title);
}

</script>

<style scoped>

</style>
