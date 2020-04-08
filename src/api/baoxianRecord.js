import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function add(obj) {
  return request({
    url: BASE_URL + 'baoxian/add',
    method: 'POST',
    data: obj
  })
}

export function getPage(pageNum, pageSize) {
  return request({
    url: BASE_URL + 'baoxian/getPage',
    method: 'GET',
    params: {
      pageNum, pageSize
    }
  })
}
export function getAll(customer_id) {
  return request({
    url: BASE_URL + 'baoxian/getAll',
    method: 'GET',
    params: {
      customer_id
    }
  })
}
