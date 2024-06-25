export function traverse(tree, props) {
  return tree.map((node) => {
    const ret = {}
    const childrenKey = props.children || 'children'

    Object.keys(props).forEach((key) => {
      ret[key] = node[props[key]]
    })

    ret[childrenKey] = Array.isArray(node[childrenKey]) ? traverse(node[childrenKey], props) : []

    return ret
  })
}

export const { filterParentIds, addParentIds } = (function () {
  const findNode = (id, tree: any[]) => {
    if (!id || !tree?.length)
      return

    for (let i = 0, len = tree.length; i < len; ++i) {
      const item = tree[i]
      if (item.id === id)
        return item

      if (item.children?.length) {
        const res = findNode(id, item.children)
        if (res)
          return res
      }
    }
  }

  // 获取包括自己的所有父节点的集合(发送给后端的数据时需要有父节点id)
  const getParentIds = (id, tree) => {
    const list = [] as number[]
    const node = findNode(id, tree)
    if (node) {
      list.push(node.id)
      if (node.parentId)
        list.push(...getParentIds(node.parentId, tree))
    }
    return list
  }

  function getChildren(id, tree) {
    const node = findNode(id, tree)
    return node?.children.map(child => child.id)
  }

  // 从后端获取的数据里包含了多余的父节点, 通过这个函数过滤掉多余的父节点id
  function filterParentIds(ids, tree) {
    const deleteParentIds = new Set()

    ids.forEach((id) => {
      if (deleteParentIds.has(id))
        return void 0

      const fullChildren = getChildren(id, tree)

      if (!fullChildren)
        return void 0

      const isFull = fullChildren.every(child => ids.includes(child))

      if (!isFull) {
        getParentIds(id, tree).forEach((parentId) => {
          deleteParentIds.add(parentId)
        })
      }
    })

    const unnecessaryIds = [...deleteParentIds]
    return ids.filter(id => !unnecessaryIds.includes(id))
  }

  function addParentIds(ids, tree) {
    const list = []

    ids.forEach((id) => {
      list.push(...getParentIds(id, tree))
    })

    return [...new Set(list)]
  }

  return {
    filterParentIds,
    addParentIds,
  }
})()

const importConfig = {
  timeout: 20 * 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

/** 导入单个文件 */
export function importSingleFile(url) {
  const ipt = document.createElement('input')
  ipt.type = 'file'
  ipt.click()

  ipt.onchange = () => {
    const { files } = ipt
    const formData = new FormData()
    formData.append('file', files[0])
    service.post(url, formData, importConfig).then(res => console.log('res', res))
  }
}

/** 导入多个文件 */
export function importMultipleFile(url) {
  let r
  const p = new Promise((resolve) => { r = resolve })
  const ipt = document.createElement('input')
  ipt.type = 'file'
  ipt.multiple = true
  ipt.click()

  ipt.onchange = () => {
    const { files } = ipt
    const formData = new FormData()
    for (let i = 0; i < files.length; ++i)
      formData.append('files', files[i])
    service.post(url, formData, importConfig).then(r)
  }

  return p
}

/** 导出 excel */
export async function exportExcel(filename, url, params = {}) {
  try {
    await ElMessageBox.confirm('确定要导出吗?', '提示', { type: 'warning' })
    console.log('2333')
    const res = await service.get(url, { responseType: 'blob', params }) as Blob
    const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
    const downloadElem = document.createElement('a')
    const href = URL.createObjectURL(blob)
    downloadElem.href = href
    downloadElem.download = `${filename + new Date().toLocaleDateString()}.xlsx`
    document.body.appendChild(downloadElem)
    downloadElem.click()
    document.body.removeChild(downloadElem)
    URL.revokeObjectURL(href)
  }
  catch (e) {}
}

export function useList(API, params = {}) {
  const ret = reactive({
    list: [],
    active: null,
  })
  if (typeof API !== 'function') { ret.list = API }
  else {
    API(params).then((res) => {
      if (Array.isArray(res)) ret.list = res
      else if (Array.isArray(res.data)) ret.list = res.data
      ret.active = ret.list[0]
    })
  }

  return ret
}
