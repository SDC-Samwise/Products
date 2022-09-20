import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // { duration: '10s', target: 50 },
    // { duration: '20s', target: 100 },
    // { duration: '10s', target: 0 },
    { duration: '1s', target: 1000 },
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/products/1/styles/');
  check(res, { 'status was 201': (r) => r.status == 201 });
  sleep(1);
}