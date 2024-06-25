export function openDoor(number) {
  // 请求档案柜开门
  fetch(`${window.__DOOR_API_ADDRESS}/daxt/sys/archivesFileCabinet/openDoor?number=${number}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok)
        throw new Error('Network response was not ok')

      return response.json()
    })
    .then((data) => {
      if (data.code === 200)
        ElMessage.success('操作成功')
    })
    .catch((error) => {
      console.error('发生错误:', error)
      ElMessage.error('操作失败')
    })
}

export function closeDoor(number) {
  // 请求档案柜关门
  fetch(`${window.__DOOR_API_ADDRESS}/daxt/sys/archivesFileCabinet/closeDoor?number=${number}`, { method: 'GET' })
    .then((response) => {
      if (!response.ok)
        throw new Error('Network response was not ok')

      return response.json()
    })
    .then((data) => {
      if (data.code === 200)
        ElMessage.success('操作成功')
    })
    .catch((error) => {
      console.error('发生错误:', error)
      ElMessage.error('操作失败')
    })
}

export function checkDoorConnection() {}
