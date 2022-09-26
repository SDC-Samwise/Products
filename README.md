# Atelier Ecommerce Backend Microservice

Atelier is a backend microservice for an E-Commerce website which was scaled in AWS EC2 using an Nginx Load Balancing Server, 4 host servers and PostgreSQL database. It supports 1K RPS with response latency of 65ms (down from 500ms+).

## Details

### Step 1:
Created all the API endpoints and routes. Local benchmarks for each endpoint averaged around 800ms without index, a bulk of that coming from the Styles endpoint. After indexing, query speeds increased from 3 seconds to 50ms (using PgAdmin) and 10ms (using Postman). Local stress test with K6 shows that the breakpoint was at 500VUs.

### Local Query Results

| Indexing | Time          |
| :---     | :----:        |
| Without  | 3.131 seconds |
| With/PgAdmin     | 0.045 seconds |
| With/Postman     | 0.01 seconds |

### Local Stress Test
![k6 Local](images/local_stress.png)

## Step 2: Implementing Nginx Load Balancer with Round Robin algo around 5 host servers

In testing I configured 1 AWS EC2 instance of the backend.  I ran test on it and noticed it quickly failed as I increased traffic.

I then created an Amazon Machine Image of the EC2 instance and used AWS to create 4 more images using the AMI.

I configured a 6th EC2 instance running Nginx as a load balancer and retested with [loader.io](https://loader.io/).

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
