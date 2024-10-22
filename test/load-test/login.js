import http from 'k6/http';
import { check, group } from 'k6';

export const options = {
  duration: '30s',
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'count'],
};

export default function () {
  let body = JSON.stringify({
    email: 'superadmin@ummhospital.com',
    password: 'RSUMM@17082013',
  });

  let params = {
    headers: {
      'client-key':
        'U2FsdGVkX18Wuc8gncVIHlBqLjDJwxH/U0F7udOv69mTgHwW4SnHsgfGJVV74s58B5tw4+h8w57ImuZXDd8oOM24Pa5Qpv/oC6o8NGNq16n4Kxi4KGlHBrAH9Nn9W/BVLjCJiXVV1vHKN2ausfWsyg==',
      'Content-Type': 'application/json',
    },

    tags: {
      name: 'login',
    },
  };
  group('Login', () => {
    let login_response = http.post(
      'http://localhost:3001/auth/login',
      body,
      params,
    );

    check(login_response, {
      'is status 200': (r) => r.status === 200,
    });
  });
}
