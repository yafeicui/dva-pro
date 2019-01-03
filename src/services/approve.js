import axios from 'axios';

let path = '/firework-backend';

export function waitingTableList(params) {
  return axios({
    url: `${path}/audit/list/auditing`,
    params
  });
}
export function alreadyTableList(params) {
  return axios({
    url: `${path}/audit/list/audited`,
    params
  });
}
