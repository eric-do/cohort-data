import request from 'supertest';
import { init, app, DI } from '../app';
import { generateCohort } from '@test/helpers';
const {
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_HOST
} = process.env

describe("/api/cohorts", () => {

  beforeEach(async () => {
    try {
      await init;
      DI.orm.config.set('host', MYSQL_HOST);
      DI.orm.config.set('port', 3306);
      DI.orm.config.set('user', MYSQL_USER);
      DI.orm.config.set('password', MYSQL_PASSWORD);
      DI.orm.config.set('dbName', MYSQL_DATABASE);
      DI.orm.config.getLogger().setDebugMode(false);
      await DI.orm.config.getDriver().reconnect();
      await DI.orm.getSchemaGenerator().clearDatabase();
    } catch (err) {
      console.log(err);
    }
  });

  afterEach(async () => {
    await DI.orm.close(true);
    DI.server.close();
  });

  test('It should create a valid cohort', async () => {
    const cohort = generateCohort();

    const response = await request(app)
      .post("/api/cohorts")
      .send({ cohort })

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('cohort');
    expect(response.body.cohort).toHaveProperty('code');
  })
});