import axios from 'axios';

let path = '/firework-backend';

export function locationTableList(params) {
  return axios({
    url: `${path}/location/list`,
    params
  });
}
export function savePut(data) {
  return axios({
    url: `${path}/location/save`,
    method: 'post',
    data
  });
}

export function updatePut(data) {
  return axios({
    url: `${path}/location/update`,
    method: 'post',
    data
  });
}

export function deletePutData(params) {
  return axios({
    url: `${path}/location/delete`,
    params
  });
}
