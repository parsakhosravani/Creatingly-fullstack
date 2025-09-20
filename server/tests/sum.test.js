const request = require("supertest");
const app = require("../server");

describe("POST /api/sum", () => {
  test("should calculate sum of positive numbers", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [1, 2, 3, 4, 5] })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.sum).toBe(15);
    expect(response.body.data.count).toBe(5);
  });

  test("should calculate sum of negative numbers", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [-1, -2, -3] })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.sum).toBe(-6);
  });

  test("should calculate sum of mixed numbers", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [10, -5, 3.5, -2.5] })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.sum).toBe(6);
  });

  test("should handle single number", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [42] })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.sum).toBe(42);
  });

  test("should return error for empty array", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [] })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe("Validation failed");
  });

  test("should return error for missing numbers field", async () => {
    const response = await request(app).post("/api/sum").send({}).expect(400);

    expect(response.body.success).toBe(false);
  });

  test("should return error for invalid data types", async () => {
    const response = await request(app)
      .post("/api/sum")
      .send({ numbers: [1, "two", 3] })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});

describe("GET /health", () => {
  test("should return health status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("OK");
    expect(response.body.timestamp).toBeDefined();
    expect(typeof response.body.uptime).toBe("number");
  });
});
