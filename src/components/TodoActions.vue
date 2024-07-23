<template>
  <div>
    <VBtn
      color="primary"
      elevation="2"
      @click="undoAll()"
    >
      Desfazer seleção
    </VBtn>
    <VBtn
      color="red-accent-4"
      elevation="2"
      @click="deleteAll()"
    >
      Deletar todos os itens
    </VBtn>
  </div>
</template>

<script setup lang="ts">
import Store from '@/store/Store';

const {deleteAll, undoAll} = Store();

</script>

<style scoped>

</style>
