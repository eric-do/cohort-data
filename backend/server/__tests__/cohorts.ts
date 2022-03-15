import request from 'supertest';
import { init, app, DI } from '../app';
import { generateCohort, generateStudent } from '@test/helpers';
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

  test('A GET returns cohort specific information', async () => {
    const cohort = generateCohort();

    await request(app)
      .post("/api/cohorts")
      .send({ cohort })

    const response = await request(app)
      .get(`/api/cohorts/${cohort.code}`)

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('cohort');
    expect(response.body.cohort).toHaveProperty('code');
    expect(response.body.cohort).toHaveProperty('techMentor');
    expect(response.body.cohort).toHaveProperty('cohortLead');
    expect(response.body.cohort).toHaveProperty('students');
    expect(response.body.cohort).toHaveProperty('startDate');
    expect(response.body.cohort).toHaveProperty('endDate');
  })

  test('Student can be added to a cohort', async () => {
    const cohort = generateCohort();
    const student = generateStudent();

    await request(app)
      .post("/api/cohorts")
      .send({ cohort })

    await request(app)
      .post("/api/students")
      .send({ student })

    const postResponse = await request(app)
      .post(`/api/cohorts/${cohort.code}`)
      .send({ student })

    const getResponse = await request(app)
      .get(`/api/cohorts/${cohort.code}`)

    expect(postResponse.statusCode).toBe(201)
    expect(getResponse.statusCode).toBe(200)
    expect(getResponse.body.cohort.students).toHaveLength(1);
  })
});