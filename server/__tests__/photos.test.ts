import supertest from "supertest";
import app from "../src/index";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const request = supertest(app);

describe("GET /photos", () => {
  it("should respond with json", async () => {
    await request
      .get("/photos")
      .set("User-Agent", process.env.PASS)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should respond with an array of objects", async () => {
    const res = await request
      .get("/photos")
      .set("User-Agent", process.env.PASS)
      .expect(200);

    expect(res.body).toEqual(expect.arrayContaining([]));
  });

  it("the array objects should have key author and url", async () => {
    const res = await request
      .get("/photos")
      .set("User-Agent", process.env.PASS)
      .expect(200);

    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: expect.any(String),
          url: expect.any(String),
        }),
      ])
    );
  });

  it("should reject if the useragent isnt present", async () => {
    await request.get("/photos").expect(401);
  });
});

describe("POST /photos", () => {
  it("should respond with json", async () => {
    return await request
      .post("/photos/")
      .field("name", "mountain")
      .field("author", "Bob Joe")
      .attach(
        "image",
        await path.resolve(
          __dirname,
          "./bianca-flister-XcjTn8cZIyM-unsplash.jpg"
        )
      )
      .set("User-Agent", process.env.PASS)
      .expect(200)
      .expect("Content-Type", /json/);
  });
  it("should respond with the file information", async () => {
    const res = await request
      .post("/photos/")
      .set("User-Agent", process.env.PASS)
      .field("name", "mountain")
      .field("author", "Bob Joe")
      .attach(
        "image",
        await path.resolve(
          __dirname,
          "./bianca-flister-XcjTn8cZIyM-unsplash.jpg"
        )
      )
      .expect(200);

    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("author");
  });

  it("should 400 missing fields", async () => {
    await request
      .post("/photos/")
      .set("User-Agent", process.env.PASS)
      .field("author", "Bob Joe")
      .attach("image", "./bianca-flister-XcjTn8cZIyM-unsplash.jpg")
      .expect(400);
  });

  it("should 403 not allowed files", async () => {
    await request
      .post("/photos/")
      .set("User-Agent", process.env.PASS)
      .field("author", "Bob Joe")
      .field("name", "mountain")
      .attach("image", "./hackerman.txt")
      .expect(403);
  });
});
