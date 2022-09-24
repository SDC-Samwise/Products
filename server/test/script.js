import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '20s', target: 100 },
    { duration: '20s', target: 200 }, // normal load
    { duration: '20s', target: 300 },
    { duration: '20s', target: 400 }, // stress load
    { duration: '10s', target: 0 }, // scale down
  ],
};

const API_URL = 'http://localhost:3000';

export default () => {
  http.batch([
    ['GET', `${API_URL}/products/3`],
    ['GET', `${API_URL}/products/3/styles`],
  ]);
  sleep(1);
};