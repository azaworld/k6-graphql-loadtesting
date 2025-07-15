# k6 GraphQL Load Testing Framework

This repository provides a **comprehensive, end-to-end load testing framework** tailored for GraphQL APIs, built on the powerful [k6](https://k6.io/) load testing tool. It's engineered for seamless integration, offering a **Dockerized** setup, **AWS deployment readiness**, **CI/CD pipeline integration**, and **Microsoft Teams notifications** for test results.

-----

## 🚀 Features

  * **Customizable Load Tests:** Easily configure and run load tests for your GraphQL endpoints with various scenarios.
  * **Rich HTML Reports:** Generate detailed HTML reports featuring intuitive pie charts, comprehensive metrics, and pass/fail breakdowns for clear insights.
  * **Dockerized Execution:** Achieve consistent and portable test runs across different environments using Docker.
  * **Cloud Deployment Ready:** Effortlessly deploy and execute tests on **AWS EC2** or other cloud infrastructure.
  * **CI/CD Integration:** Integrate seamlessly with **GitHub Actions** (adaptable to other platforms) to automate your load testing workflow.
  * **Real-time Notifications:** Receive instant test completion notifications directly in your **Microsoft Teams** channel via webhooks.
  * **Flexible Configuration:** Customize test parameters with ease using environment variables.
  * **Maintainable Structure:** A well-organized folder structure ensures easy maintenance and extensibility.

-----

## 📂 Folder Structure

```
k6-graphql-loadtesting-framework/
├── tests/
│   ├── customer_mutation.js         # Sample GraphQL mutation test
│   ├── get_customer.js              # Sample GraphQL query test
├── utils/
│   └── html-summary.js              # HTML report generator
├── docker/
│   ├── Dockerfile                   # Docker image definition
│   └── entrypoint.sh                # Script to run tests and send notifications
├── reports/                         # Generated HTML reports saved here
├── .github/
│   └── workflows/
│       └── ci-cd-pipeline.yml       # GitHub Actions workflow for CI/CD
├── README.md
├── .gitignore
└── LICENSE
```

-----

## 🐳 Docker Setup

Get started quickly by building and running your tests in Docker.

### Build the Docker Image

```bash
docker build -t k6-loadtest ./docker
```

### Run Tests in Docker

Adjust the environment variables as needed for your specific test scenario.

```bash
docker run --rm \
  -e GRAPHQL_ENDPOINT=https://store.fur4.com/graphql \
  -e MAX_VUS=10 \
  -e TEST_DURATION=30s \
  -e TEAMS_WEBHOOK_URL="https://your-teams-webhook-url" \
  -v $(pwd)/reports:/app/reports \
  k6-loadtest
```

  * **Reports:** HTML reports will be saved to the `reports/` folder on your host machine.
  * **Notifications:** If `TEAMS_WEBHOOK_URL` is configured, a test completion notification will be sent to your Microsoft Teams channel.

-----

## ☁️ Running on AWS EC2

Deploying your load tests to AWS EC2 is straightforward:

1.  **Launch EC2 Instance:** Provision an EC2 instance with Docker installed (Amazon Linux 2 or Ubuntu are recommended).
2.  **Clone Repository:** Clone this repository onto your EC2 instance.
3.  **Build and Run:** Follow the Docker setup steps above to build and run the container.
4.  **(Optional) Schedule Runs:** Set up a cron job or systemd timer to automate recurring test runs.
5.  **Share Reports:** Serve the generated reports via a web server or upload them to AWS S3 for easy sharing.

-----

## ⚙️ CI/CD Pipeline with GitHub Actions

The provided `.github/workflows/ci-cd-pipeline.yml` automates your load testing with GitHub Actions:

  * **Triggers:** The workflow activates on pushes and pull requests to your `main` or `master` branches.
  * **Execution:** It builds and runs the Docker container to execute your load tests.
  * **Artifacts:** The generated HTML test report is uploaded as a GitHub artifact.
  * **Teams Notifications:** Test completion notifications are sent to Teams (requires the `TEAMS_WEBHOOK_URL` secret).

**Important:** Remember to add `TEAMS_WEBHOOK_URL` as a secret in your GitHub repository settings to enable Teams notifications.

-----

## 🔧 Environment Variables

Customize your load tests using these environment variables:

| Variable            | Description                                   | Default                                          |
| :------------------ | :-------------------------------------------- | :----------------------------------------------- |
| `GRAPHQL_ENDPOINT`  | URL of your GraphQL API endpoint              | `https://store.fur4.com/graphql`                 |
| `MAX_VUS`           | Maximum virtual users to simulate             | `10`                                             |
| `TEST_DURATION`     | Duration of the load test (e.g., `30s`, `2m`) | `30s`                                            |
| `TEAMS_WEBHOOK_URL` | Microsoft Teams webhook URL for notifications | (empty, disables notifications)                  |

-----

## 🧪 Writing Tests

  * Store all your k6 test scripts in the `tests/` folder.
  * Refer to `customer_mutation.js` and `get_customer.js` for example test implementations.
  * Develop your test logic in JavaScript, following the official [k6 scripting guide](https://k6.io/docs/).

-----

## 📊 Reports and Logs

Upon each test completion, a detailed HTML report is generated and saved in the `reports/` folder. These reports provide:

  * **Success/Failure Pie Charts:** Visual summaries of test outcomes.
  * **Detailed Metrics:** In-depth performance metrics.
  * **GraphQL Error Details:** Specific information on any GraphQL errors encountered.
  * **Pass/Fail Tables:** Clear tables indicating test successes and failures.

These reports are ideal for sharing with stakeholders, DevOps teams, and management for easy performance visualization.

-----

## 📬 Notifications

When `TEAMS_WEBHOOK_URL` is configured, a concise notification will be sent to your specified Microsoft Teams channel after each test run. You can customize the content of this notification by modifying the `docker/entrypoint.sh` script.

-----

## 🤝 Contributions

We welcome your feedback and contributions\! Feel free to open issues or submit pull requests.

-----

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](https://www.google.com/search?q=LICENSE) file for more details.

-----

## 🙋‍♂️ Contact

Created by [azaworld- arifuz antor]

-----

**Happy load testing\! 🚀**