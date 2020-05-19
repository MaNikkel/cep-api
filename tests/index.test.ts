// chai imports: regular and for http requests
import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import server from "../src/server";

chai.use(chaiHttp);

describe("CEP function", () => {
  it("GET/search => should have status 200", done => {
    supertest(server)
      .get("/search")
      .query({ cep: "84130000" })
      .end((_, res) => {
        chai.expect(res).have.status(200);
        done();
      });
  });
});
