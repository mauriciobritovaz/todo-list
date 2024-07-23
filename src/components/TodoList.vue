<template>
  <VList density="compact" lines="one">
    <VListItem
      v-for="todo in props.todos"
      :key="todo.title"
      :value="todo.title"
    >
      <VListItemAction end>
        <VCheckbox v-model="todo.done"></VCheckbox>
      </VListItemAction>
      <VListItemTitle>{{ todo.title }}</VListItemTitle>
      <VListItemAction start>
        <VBtn
          color="grey-lighten-1"
          icon="mdi-close"
          variant="text"
          @click="handleDelete(todo.title)"
        ></VBtn>
      </VListItemAction>
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
