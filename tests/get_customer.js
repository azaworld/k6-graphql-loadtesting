import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const gql_errors = new Counter('gql_errors');

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000'],
  },
};

const query = `
query Customer {
  customer {
    allow_remote_shopping_assistance
    created_at
    date_of_birth
    default_billing
    default_shipping
    dob
    email
    firstname
    gender
    group_id
    id
    is_subscribed
    lastname
    middlename
    prefix
    suffix
    taxvat
    custom_attributes {
      code
      ... on AttributeValue {
        value
      }
      ... on AttributeSelectedOptions {
        selected_options {
          label
          value
        }
      }
    }
    orders(sort: { sort_field: CREATED_AT, sort_direction: DESC }) {
      total_count
      items {
        carrier
        created_at
        grand_total
        id
        increment_id
        number
        order_date
        order_number
        shipping_method
        status
        total {
          total_tax {
            currency
            value
          }
        }
        items {
          product_sku
        }
        billing_address {
          city
          company
          country_code
          fax
          firstname
          lastname
          middlename
          postcode
          prefix
          region
          region_id
          street
          suffix
          telephone
          vat_id
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    addresses {
      city
      company
      country_code
      country_id
      customer_id
      default_billing
      default_shipping
      fax
      firstname
      id
      lastname
      middlename
      postcode
      prefix
      region {
        region
        region_code
      }
      region_id
      street
      suffix
      telephone
      vat_id
    }
  }
}
`;

const url = 'https://store2.fur4.com/graphql';

export default function () {
  const payload = JSON.stringify({ query });

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(url, payload, { headers });

  const body = res.json();

  check(res, {
    'status is 200': (r) => r.status === 200,
    'no GraphQL errors': () => !body.errors,
  });

  if (body.errors?.length) {
    gql_errors.add(1, { message: body.errors[0].message });
  }

  sleep(1);
}

// Optional: include your HTML summary generator here if you want HTML reports
// import { handleSummary } from '../utils/html-summary.js';
// export { handleSummary };
