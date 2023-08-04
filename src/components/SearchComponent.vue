<template>
  <div class="search-component">
    <q-input outlined :model-value="props.modelValue" @update:model-value="emits('update:modelValue', $event)">
      <template v-slot:append>
        <q-btn
          color="primary"
          label="Search"
          @click="search"
        />
      </template>
    </q-input>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  'update:modelValue': [value: string|number|null]
}>()
const router = useRouter()

async function search() {
  console.log('searching for', props.modelValue)
  router.push({ name: 'search', query: { keyword: props.modelValue } })
}
</script>
