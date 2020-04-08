import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(obj) {
  return request({
    url: BASE_URL + 'part/add',
    method: 'POST',
    data: obj
  })
}
export function update(obj) {
  return request({
    url: BASE_URL + 'part/update',
    method: 'POST',
    data: obj
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'part/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
export function deleteById(id) {
  return request({
    url: BASE_URL + 'part/delete',
    method: 'GET',
    params: {
      id
    }
  })
}
export function search(matchStr, pageNum, pageSize) {
  return request({
    url: BASE_URL + 'part/search',
    method: 'GET',
    params: {
      matchStr, pageNum, pageSize
    }
  })
}
export function getById(id) {
  return request({
    url: BASE_URL + 'part/getById',
    method: 'GET',
    params: {
      id
    }
  })
}
