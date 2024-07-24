<template>
  <VTextField
    class="mt-2"
    v-model="title"
    label="Adicionar todo"
    append-inner-icon="mdi-plus"
    @keyup.enter.prevent="onSave"
    :rules="[rules.valid]"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Store from '@/store/Store';

const { alreadyHasTodo, addTodo } = Store();

const title = ref('');
const rules = {
  valid: (value: String) => !alreadyHasTodo(value.trim()) || 'Todo com titulo repetido!'
}

const onSave = () => {
  const newTodo = {
    title: title.value.trim(),
    done: false
  }

  if(newTodo.title.length > 0 && !alreadyHasTodo(newTodo.title)){
    addTodo(newTodo);
    title.value = ''
  }
}
</script>

<style scoped>

</style>
