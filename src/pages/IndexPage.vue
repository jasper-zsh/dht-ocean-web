<template>
  <q-page class="row items-center justify-evenly">
    <search-component v-model="keyword" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SearchComponent from 'src/components/SearchComponent.vue';

const keyword = ref('')

</script>
