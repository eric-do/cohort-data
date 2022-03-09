import request from 'supertest';
import app from '../app';

describe("/api/students", () => {

  test("It should respond to the POST method", async () => {
    const student = {
      github: 'student-github',
      email: 'student@mail.com',
    };

    const response = await request(app)
      .post("/api/students")
      .send({ student })

    expect(response.statusCode).toBe(201);
  });

  test("It should respond to the GET method", async () => {
    const response = await request(app)
      .get("/api/students")
    expect(response.statusCode).toBe(200);
  });
});