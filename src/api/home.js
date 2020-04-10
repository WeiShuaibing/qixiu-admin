import request from '@/utils/request'
import BASE_URL from '@/api/base'

export function getBaseData() {
  return request({
    url: BASE_URL + 'home/getBaseData',
    method: 'GET'
  })
}

export function getBaseDataOfChart(days) {
  return request({
    url: BASE_URL + 'home/getBaseDataOfChart',
    method: 'GET',
    params: {
      days
    }
  })
}
