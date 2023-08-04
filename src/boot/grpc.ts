import { credentials } from '@grpc/grpc-js'
import { boot } from 'quasar/wrappers'
import { ocean } from 'src/gen/ocean'

export const Ocean = new ocean.OceanClient('localhost:8888', credentials.createInsecure())

export async function search(keyword: string, perPage: number, page: number) {
  const req = new ocean.SearchTorrentsRequest({
    keyword: keyword,
    per_page: perPage,
    page: page,
  })
  return await Ocean.SearchTorrents(req)
}

export default boot(({ app }) => {
  app.config.globalProperties.$ocean = {
    search
  }
})
