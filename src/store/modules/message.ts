export const useMessageStore = defineStore('message', () => {
  const isLoading = ref(false)
  const todo = ref([] as any[])

  // eslint-disable-next-line unused-imports/no-unused-vars
  async function loadTodoCount(arg = {}) {
    // const res = await Api.getPostsAuditSta({ enabled: true, isCheck: false, ...arg })
    const res = []
    todo.value = res
  }

  return {
    loadTodoCount,
    isLoading,
    todo,
  }
})
