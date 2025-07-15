🚀 k6 GraphQL Load Testing Framework
A robust and enterprise-grade load testing framework for GraphQL APIs, powered by k6. This framework is meticulously designed for scalability, portability, and seamless integration with modern DevOps ecosystems. It supports Dockerized workflows, AWS cloud deployments, CI/CD automation, real-time Microsoft Teams notifications, and advanced reporting for comprehensive performance insights.

🌟 Key Features

Flexible Load Testing: Simulate real-world traffic with customizable scenarios for GraphQL queries and mutations.
Advanced Reporting: Generate rich HTML reports featuring interactive pie charts, trend graphs, and detailed error breakdowns.
Containerized Execution: Run tests in a consistent, portable Docker environment for reproducible results.
Cloud-Native: Deploy effortlessly on AWS EC2, ECS, or other cloud platforms with auto-scaling support.
CI/CD Integration: Automate testing with GitHub Actions, GitLab CI, or Jenkins for streamlined workflows.
Real-Time Notifications: Send test results and alerts to Microsoft Teams or Slack via webhooks.
Highly Configurable: Use environment variables to tailor test parameters without code changes.
Modular Architecture: Organized folder structure for easy maintenance, extensibility, and collaboration.
Threshold-Based Monitoring: Define performance thresholds to automatically flag failing tests.
Multi-Protocol Support: Extendable to test REST APIs or WebSocket endpoints alongside GraphQL.


📂 Project Structure
k6-graphql-loadtesting-framework/
├── tests/                        # k6 test scripts
│   ├── customer_mutation.js      # Example GraphQL mutation test
│   ├── get_customer.js           # Example GraphQL query test
│   └── stress_test.js            # Example stress test for peak load
├── utils/                        # Utility scripts and helpers
│   ├── html-summary.js           # Custom HTML report generator
│   ├── logger.js                 # Logging utility for test runs
│   └── graphql-client.js         # Reusable GraphQL request helper
├── docker/                       # Docker configuration
│   ├── Dockerfile                # Docker image for k6 runtime
│   └── entrypoint.sh             # Entry script for test execution and notifications
├── reports/                      # Output directory for HTML reports
├── scripts/                      # Automation scripts
│   └── deploy_aws.sh             # Script for AWS EC2 deployment
├── .github/workflows/            # CI/CD pipeline configuration
│   └── ci-cd-pipeline.yml        # GitHub Actions workflow
├── .gitignore                    # Git ignore patterns
├── LICENSE                       # MIT License
└── README.md                     # Project documentation


🛠️ Prerequisites

Docker (for containerized execution)
k6 (for local development)
Node.js (optional, for report generation utilities)
AWS CLI (optional, for cloud deployments)
Microsoft Teams webhook URL (for notifications)


🐳 Docker Setup
Build the Docker Image
docker build -t k6-graphql-loadtest ./docker

Run Tests in Docker
docker run --rm \
  -e GRAPHQL_ENDPOINT=https://store.fur4.com/graphql \
  -e MAX_VUS=50 \
  -e TEST_DURATION=60s \
  -e TEAMS_WEBHOOK_URL="https://your-teams-webhook-url" \
  -e SLACK_WEBHOOK_URL="https://your-slack-webhook-url" \
  -e THRESHOLD_RPS=100 \
  -v $(pwd)/reports:/app/reports \
  k6-graphql-loadtest


Output: HTML reports are saved to the reports/ folder on the host machine.
Notifications: If TEAMS_WEBHOOK_URL or SLACK_WEBHOOK_URL is set, test results are sent to the respective platforms.
Thresholds: Set THRESHOLD_RPS to define requests-per-second thresholds for pass/fail criteria.


☁️ Cloud Deployment (AWS EC2)
Steps

Launch an EC2 instance (Amazon Linux 2 or Ubuntu) with Docker installed.
Clone this repository:git clone https://github.com/your-repo/k6-graphql-loadtesting-framework.git
cd k6-graphql-loadtesting-framework


Build and run the Docker container (see Docker Setup).
(Optional) Automate test execution:
Use scripts/deploy_aws.sh for streamlined EC2 setup.
Schedule tests with cron or systemd timers.


Serve reports via a web server (e.g., Nginx) or upload to AWS S3:aws s3 cp reports/ s3://your-bucket/reports/ --recursive



Advanced AWS Options

Deploy to AWS ECS for container orchestration.
Use AWS CloudWatch for monitoring test metrics.
Integrate with AWS Lambda for serverless test triggers.


⚙️ CI/CD Integration
The .github/workflows/ci-cd-pipeline.yml automates the following:

Triggers on pushes/pull requests to main or master.
Builds and runs the Docker container for tests.
Archives HTML reports as GitHub Actions artifacts.
Sends notifications to Microsoft Teams or Slack.
Validates test thresholds and fails the pipeline on violations.

Setup

Add secrets in GitHub repository settings:
TEAMS_WEBHOOK_URL: Microsoft Teams webhook.
SLACK_WEBHOOK_URL: Slack webhook (optional).
AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (for S3 uploads).


Customize ci-cd-pipeline.yml for other CI/CD platforms (e.g., GitLab, Jenkins).


🔧 Environment Variables



Variable
Description
Default



GRAPHQL_ENDPOINT
GraphQL API endpoint URL
https://store.fur4.com/graphql


MAX_VUS
Maximum virtual users to simulate
50


TEST_DURATION
Duration of the load test (e.g., 60s, 5m)
60s


THRESHOLD_RPS
Requests-per-second threshold for pass/fail
100


TEAMS_WEBHOOK_URL
Microsoft Teams webhook URL for notifications
(Empty disables notifications)


SLACK_WEBHOOK_URL
Slack webhook URL for notifications
(Empty disables notifications)


REPORT_NAME
Custom name for the HTML report file
report_<timestamp>.html



🧪 Writing and Running Tests
Creating Tests

Place k6 test scripts in the tests/ folder.
Use customer_mutation.js and get_customer.js as templates.
Leverage utils/graphql-client.js for reusable GraphQL request logic.
Follow the k6 scripting guide for advanced scripting.

Example Test Scenario
import { check } from 'k6';
import { graphql } from '../utils/graphql-client.js';

export default function () {
  const query = `
    query GetCustomer($id: ID!) {
      customer(id: $id) {
        id
        name
      }
    }
  `;
  const variables = { id: '123' };
  const response = graphql(http.post, query, variables);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'no errors': (r) => !r.json('errors'),
  });
}

Advanced Scenarios

Stress Testing: Use stress_test.js to simulate peak loads.
Soak Testing: Configure long-running tests to detect memory leaks.
Spike Testing: Simulate sudden traffic spikes with dynamic VUs.


📊 Reporting and Analytics

Output: HTML reports are generated in the reports/ folder after each test run.
Features:
Interactive pie charts for success/failure rates.
Time-series graphs for response times and throughput.
Detailed tables for GraphQL errors and threshold violations.
Exportable metrics for external analytics tools (e.g., Grafana).


Customization: Modify utils/html-summary.js to tailor report styles or metrics.


📬 Notifications

Microsoft Teams/Slack: Configure TEAMS_WEBHOOK_URL or SLACK_WEBHOOK_URL to receive test completion alerts.
Customization: Edit docker/entrypoint.sh to modify notification content, such as including pass/fail status or key metrics.
Example Notification:🧪 k6 Load Test Completed
Endpoint: https://store.fur4.com/graphql
VUs: 50 | Duration: 60s | RPS: 120
Status: ✅ Passed
Report: <link-to-report>




🔍 Monitoring and Observability

Integrate with k6 Cloud for real-time test monitoring.
Export metrics to Prometheus or InfluxDB for advanced analytics.
Use AWS CloudWatch to track EC2 instance performance during tests.


🤝 Contributing
We welcome contributions! To get started:

Fork the repository.
Create a feature branch (git checkout -b feature/awesome-feature).
Commit changes (git commit -m 'Add awesome feature').
Push to the branch (git push origin feature/awesome-feature).
Open a pull request.

Please report bugs or suggest features via GitHub Issues.

📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

🙋 Contact
Created by [azaworld - Arifuz Antor]📧 Email: arifuz@example.com🌐 GitHub: your-repo/k6-graphql-loadtesting-framework

🚀 Get Started
git clone https://github.com/your-repo/k6-graphql-loadtesting-framework.git
cd k6-graphql-loadtesting-framework
docker build -t k6-graphql-loadtest ./docker
docker run --rm -e GRAPHQL_ENDPOINT=https://your-graphql-api -v $(pwd)/reports:/app/reports k6-graphql-loadtest

Happy Load Testing! 🎉