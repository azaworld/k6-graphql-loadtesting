// @ts-nocheck
import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { Counter } from 'k6/metrics';

// Custom metric to sample GraphQL errors for the HTML report
export const gql_errors = new Counter('gql_errors');

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

// Load test‑user data once per k6 worker
const users = new SharedArray('users', () => JSON.parse(open('../data.json')));

// GraphQL mutation string
const mutation = `
mutation createCustomer(
  $email: String!, $firstname: String!, $lastname: String!,
  $password: String!, $phone: String!
) {
  createCustomerV2(
    input: {
      email: $email
      firstname: $firstname
      lastname: $lastname
      password: $password
      is_subscribed: false
      custom_attributes: [
        { attribute_code: "two_factor_authentication", value: 0 }
        { attribute_code: "phone_number", value: $phone }
      ]
    }
  ) { customer { id } cus_id }
}`;

// Endpoint (overridable via env var)
const url = __ENV.GRAPHQL_URL || 'https://store.fur4.com/graphql';

export default function () {
  // Round‑robin through user data
  const u = users[(__VU - 1) % users.length];

  // Build request payload
  const payload = JSON.stringify({
    query: mutation,
    variables: {
      email: u.email,
      firstname: u.firstname,
      lastname: u.lastname,
      password: u.password,
      phone: u.phone,
    },
  });

  const res = http.post(url, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  const body = JSON.parse(res.body);

  // k6 checks
  check(res, {
    'status is 200': r => r.status === 200,
    'no GraphQL errors': () => !body.errors,
  });

  // Store first error message (if any) for summary
  if (body.errors?.length) {
    gql_errors.add(1, { message: body.errors[0].message });
  }

  sleep(1);
}

// Attach HTML summary generator
import { handleSummary } from '../utils/html-summary.js';
export { handleSummary };
