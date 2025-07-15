```markdown
# k6 GraphQL Load Testing Framework

This repository contains an **end-to-end load testing framework** for GraphQL APIs using [k6](https://k6.io/).  
It is designed to be **Dockerized**, run on **AWS**, integrated with **CI/CD pipelines**, and send **test result notifications to Microsoft Teams**.  

---

## 🚀 Features

- Load testing for GraphQL endpoints with customizable scenarios  
- Rich, detailed **HTML report generation** with pie charts and detailed metrics  
- **Dockerized** for consistent, portable test execution  
- Easily deploy and run on **AWS EC2** or other cloud infrastructure  
- **CI/CD integration** with GitHub Actions (or adaptable to other platforms)  
- Send **real-time notifications to Microsoft Teams** webhook  
- Flexible environment variables for easy customization  
- Well-organized folder structure for easy maintenance and extension  

---

## 📂 Folder Structure

```

k6-graphql-loadtesting-framework/
├── tests/
│   ├── customer\_mutation.js       # Sample GraphQL mutation test
│   ├── get\_customer.js            # Sample GraphQL query test
├── utils/
│   └── html-summary.js            # HTML report generator
├── docker/
│   ├── Dockerfile                 # Docker image definition
│   └── entrypoint.sh              # Script to run tests and send notifications
├── reports/                      # Generated HTML reports saved here
├── .github/
│   └── workflows/
│       └── ci-cd-pipeline.yml    # GitHub Actions workflow for CI/CD
├── README.md
├── .gitignore
└── LICENSE

````

---

## 🐳 Docker Setup

Build the Docker image:

```bash
docker build -t k6-loadtest ./docker
````

Run the tests inside Docker (adjust environment variables as needed):

```bash
docker run --rm \
  -e GRAPHQL_ENDPOINT=https://store.fur4.com/graphql \
  -e MAX_VUS=10 \
  -e TEST_DURATION=30s \
  -e TEAMS_WEBHOOK_URL="https://your-teams-webhook-url" \
  -v $(pwd)/reports:/app/reports \
  k6-loadtest
```

* Reports will be saved inside the `reports/` folder on your host machine
* If `TEAMS_WEBHOOK_URL` is set, a test completion notification will be sent to Microsoft Teams

---

## ☁️ Running on AWS EC2

1. Launch an EC2 instance with Docker installed (Amazon Linux 2 or Ubuntu recommended).
2. Clone this repository on the EC2 machine.
3. Build and run the Docker container as shown above.
4. (Optional) Set up a cron job or systemd timer to schedule recurring test runs.
5. Serve reports through a web server or upload to AWS S3 for sharing.

---

## ⚙️ CI/CD Pipeline with GitHub Actions

The included `.github/workflows/ci-cd-pipeline.yml` will:

* Trigger on pushes and pull requests to main/master branches
* Build and run the Docker container to execute tests
* Upload HTML test report as a GitHub artifact
* Send test completion notifications to Teams (via secret `TEAMS_WEBHOOK_URL`)

Make sure to add `TEAMS_WEBHOOK_URL` as a secret in your GitHub repository settings.

---

## 🔧 Environment Variables

| Variable            | Description                                   | Default                                                          |
| ------------------- | --------------------------------------------- | ---------------------------------------------------------------- |
| GRAPHQL\_ENDPOINT   | URL of the GraphQL API endpoint               | [https://store.fur4.com/graphql](https://store.fur4.com/graphql) |
| MAX\_VUS            | Maximum virtual users to simulate             | 10                                                               |
| TEST\_DURATION      | Duration of the load test                     | 30s                                                              |
| TEAMS\_WEBHOOK\_URL | Microsoft Teams webhook URL for notifications | (empty disables notifications)                                   |

---

## 🧪 Writing Tests

* Place all your k6 test scripts in the `tests/` folder.
* Use the existing `customer_mutation.js` and `get_customer.js` as examples.
* Write your test logic in JavaScript following the [k6 scripting guide](https://k6.io/docs/).

---

## 📊 Reports and Logs

* After each test run, a detailed HTML report will be generated in the `reports/` folder.
* Reports include success/failure pie charts, detailed metrics, GraphQL error details, and pass/fail tables.
* Reports can be shared with stakeholders, devops, or management for easy visualization.

---

## 📬 Notifications

* If `TEAMS_WEBHOOK_URL` is provided, a notification will be sent to your Teams channel after each test run.
* You can customize the notification message in the `docker/entrypoint.sh` script as needed.

---

## 🤝 Contributions

Feel free to open issues or submit pull requests.
Your feedback and contributions are highly appreciated!

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Contact

Created by \[azaworld- arifuz antor]

---

**Happy load testing! 🚀**

```

---

Just create a file named `README.md` in your project root and paste this content in.  
Let me know if you want me to help generate the other files like Dockerfile, entrypoint script, or sample test scripts!
```
