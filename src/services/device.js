import axios from 'axios';

let path = '/firework-backend';

export function deviceTableList(params) {
  return axios({
    url: `${path}/device/list`,
    params
  });
}
// 新增设备
export function saveDevice(data) {
  return axios({
    url: `${path}/device/save`,
    method: 'post',
    data
  });
}

// 编辑设备
export function updateDevice(data) {
  return axios({
    url: `${path}/device/update`,
    method: 'post',
    data
  });
}

// 删除设备
export function deleteDevice(params) {
  return axios({
    url: `${path}/device/delete`,
    params
  });
}
