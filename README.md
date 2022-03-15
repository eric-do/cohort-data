# cohort-data
Repository for maintaining student records

## Development

To set up an automated test environment, we need to use docker-compose to set up containers:
- node
- mysql

We need to import schema from our entity definitions once the containers are running.

From `./backend`:
```
npm install
docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d
npx mikro-orm schema:fresh --run
```

This runs the app and db in separate containers, and can be set up and tore down as convenient.