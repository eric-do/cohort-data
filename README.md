# cohort-data
Repository for maintaining student records

## Development

To set up an automated test environment, use docker-compose to compose containers:
- node
- mysql

MikroORM entities need to be manually imported to the schema.

From `./backend`:
```
npm install
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
npx mikro-orm schema:fresh --run
```

This runs the app and db in separate containers, and can be set up and tore down as convenient.

## API

| Method      | Endpoint             | Description                |
| ----------- | -------------------  | ----------------------     |
| GET         | /api/students        | Get a list of students     |
| POST        | /api/students        | Add a new student          |
| GET         | /api/cohorts         | Get a list of cohorts      |
| GET         | /api/cohorts/:id     | Get a cohort's details     |
| POST        | /api/cohorts         | Add a new cohort           |
| POST        | /api/cohorts/:id     | Add students to a cohort   |