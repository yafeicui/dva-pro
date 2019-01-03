import axios from 'axios';

let path = '/firework-backend';

export function fetchAppList() {
  return axios({
    url: `${path}/app/list`
  });
}
