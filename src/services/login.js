import axios from 'axios';

let path = '/firework-backend';

export function getLogin(params) {
  return axios({
    url: `${path}/login`,
    params
  });
}
