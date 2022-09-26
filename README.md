# Atelier Ecommerce Backend Microservice

Atelier is a backend microservice for an E-Commerce website which was scaled in AWS EC2 using an Nginx Load Balancing Server, 4 host servers and PostgreSQL database. It supports 1K RPS with response latency of 65ms (down from 500ms+).

## Details

### Step 1: API Endpoints and Local testing
After creating all the API endpoints and routes, local benchmarks for each endpoint averaged around 800ms. After indexing, query speeds increased from 3 seconds to 50ms (using PgAdmin) and 10ms (using Postman). Local stress test with K6 shows that the breakpoint was at 500VUs (virtual users) per second.

### Query Results

| Indexing | Time          |
| :---     | :----:        |
| Without  | 3.131 seconds |
| With/PgAdmin     | 0.045 seconds |
| With/Postman     | 0.01 seconds |

### Stress Test
![k6 Local](images/local_stress.png)

## Step 2: Deployment and Cloud Based Testing

Initially deployed a single instance on AWS, I found that server location greatly affected RPS and response latency. This server, based in N.Virginia (US East), had an average reponse time of 500ms. In order to improve speeds, I created a copy of the server with AWS AMI and deployed across region to N.California (US West). This improved response latency from 500ms to 60ms. Tests via LoaderIO showed breakpoint at 400 RPS.

### Summary of results

| Clients | Seconds | Error Rate |
| :---    | :---    | :----:     |
| 800     | 30      |  0%        |
| 900     | 30      |  0%        |


![loader_io](images/loader_io.png)

## Step 3: Change PostgreSQL handshake type from Client to Pool

In this project I expected to have multiple concurrent requests so I switched from Client to Pool because in Pool I needed to be able to re-use open client instances.  Which in turn reduced latency whenever a client could be reused.  Originally I used Client and found that with Client each handshake took time and overhead.

## Results:
Running [K6](https://k6.io/) locally with 1,000 virtual users (VUs) over the span of 15 seconds on 1 EC2 instance.

![K6-Pool](images/K6_Pool.png)
