// chai imports: regular and for http requests
import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import server from "../src/server";

chai.use(chaiHttp);

describe("Server up and runing", () => {
  it("GET/hello-world => should have status 200 in welcome page", done => {
    supertest(server)
      .get("/hello-world")
      .end((_, res) => {
        chai.expect(res).have.status(200);
        done();
      });
  });
});
