# QA Automation Test Task

In this repository you can find a test task for Automation QA.
First of all we will take a look at the quality of your job, but do not spend too much time on this task, 2-3 hours would be enough.

## Acceptance criteria

Fork this repository and push your solution into a fork in folder `e2e`. After it you only need to provide us a link to your repository with solution.

## Preferable stack of technologies

Programming language: JavaScript. Nevertheless, do not hesitate to use the technologies you are the most familiar with.

## Task

1. Run container with JSON API server:
```
docker-compose up
```
2. Go to http://localhost:9303/courses and try test this endpoint. Allowed parameters for this API method:

Parameter|Description
---|---
page|A cursor for use in pagination. Started from 1.
limit|A limit on the number of objects to be returned. Limit can range between 1 and 10, and the default is 2.
sort|Sort objects by id. Allowed values `asc` and `desc`.
