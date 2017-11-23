const request = require("supertest");
const assert = require("assert");
const app = require("../app/app.js");

describe("user_api", () => {

  it("getUser", (done) => {

    request(app.listen()).get("/api/users/getUser?id=1")     //get方法
      .set("Accept", "application/json").expect(200)//断言状态码为200
      .end((err, res) => {
        console.log(res.body);
        assert.equal(true, "username" in res.body.data);
        assert.equal(true, "age" in res.body.data);

        done();
      });
  });

  it("registerUser", (done) => {

    // 请求参数，模拟用户对象
    const user = {
      username: "阿，希爸",
      age: 31
    };

    request(app.listen()).post("/api/users/registerUser")            //post方法
      .send(user)                                 //添加请求参数
      .set("Content-Type", "application/json")    //设置header的Content-Type为json
      .expect(200)                                //断言状态码为200

      .end((err, res) => {

        console.log(res.body);

        //断言返回的code是0
        assert.equal(res.body.data.code, 0);

        done();
      });
  });
});
