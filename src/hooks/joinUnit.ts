export function joinUnit() {
  const selectVal = ref()
  // 缓存当前选中节点的key
  const cacheNodeKey = ref('')
  // 缓存拼接后的文本
  const cacheJoinLabel = ref('')

  // 节点节点事件
  function handleNodeClickEvent(node) {
    const { level, id } = node

    // 缓存当前节点的key
    cacheNodeKey.value = id as string

    // 记录当前选中的节点信息
    let cacheNode = node

    // 循环 node tree,将其放在 nodeList 里
    const nodeList = []
    for (let i = level; i >= 1; i--) {
      nodeList.unshift(cacheNode)
      cacheNode = cacheNode.parent
    }

    if (nodeList.length === 0) return

    // 数据拼接
    const labelText = nodeList.reduce((pre, cur) => {
      return (pre += ` - ${cur.name}`)
    }, '')

    // 处理拼接后的多余字符
    cacheJoinLabel.value = labelText.slice(3)

    // 一定要在 nextTick 方法中进行赋值操作
    nextTick(() => {
      selectVal.value = unref(cacheJoinLabel)
    })
  }

  function findNodeById(node, id, level) {
    if (node.id === id) {
      node.level = level
      return node
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const foundNode = findNodeById(child, id, level + 1)
        if (foundNode)
          return foundNode
      }
    }

    return null
  }

  function setParent(list: any[], parent = {}) {
    list.forEach((i) => {
      i.parent = parent
      if (i.children)
        setParent(i.children, i)
    })
    return list
  }

  return {
    selectVal,
    cacheNodeKey,
    cacheJoinLabel,
    handleNodeClickEvent,
    findNodeById,
    setParent,
  }
}
