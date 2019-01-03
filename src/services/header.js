import axios from 'axios';

let path = '/firework-backend';

export function handleLogout() {
  return axios({
    url: `${path}/logout`
  });
}
