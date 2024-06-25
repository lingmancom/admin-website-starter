window.__BASE_API = 'http://lm:1571'

window.__PREVIEW_ADDRESS = 'http://lm:8083'

window.__DOOR_API_ADDRESS = 'http://127.0.0.1:8080'


window.parsePostAddress = function (basic) {
  let address

  if (basic.startsWith('http'))
    address = basic

  else
    address = `${window.location.protocol}//${window.location.hostname}${basic}`

  return address
}
