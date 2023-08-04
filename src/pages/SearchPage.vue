<template>
  <q-page>
    <q-banner v-show="error" color="negative">
      <div class="text-h6">Failed to fetch search results</div>
    </q-banner>
    <search-component v-model="keyword" />
    <q-pagination v-model="page" :max="result?.total ?? 1" />
  </q-page>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, onServerPrefetch, ref } from 'vue'
import SearchComponent from 'src/components/SearchComponent.vue';
import { useRoute } from 'vue-router';
import { ocean } from 'src/gen/ocean';

const route = useRoute()
const keyword = ref(route.query.keyword as string)
const perPage = ref(parseInt(route.query.per_page as string || '10'))
const page = ref(parseInt(route.query.page as string || '1'))
const result = ref<ocean.TorrentPageResponse|undefined>(undefined)
const error = ref(false)

// eslint-disable-next-line vue/no-setup-props-destructure
onServerPrefetch(async () => {
  console.log('prefetching', keyword.value)
  try {
    const { appContext: { config: { globalProperties } } } = getCurrentInstance()!
    result.value = await globalProperties.$ocean.search(keyword.value, perPage.value, page.value)
  } catch (e) {
    console.error('Failed to fetch search results', e)
    error.value = true
  }
})

onMounted(() => {
  console.log('Error:', error.value)
})
</script>
