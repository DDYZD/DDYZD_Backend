const { doesNotMatch } = require("assert");
const assert = require("assert");
const sinon = require("sinon");
const check = require("../controller/check");

const checkAdmin = require("../middleware/checkAdmin");

const res = {
  status: sinon.fake().returnValues(res),
  json: sinon.fake(),
};

const next = sinon.fake();

it("관리자 아닐 경우 json 호출", function() {
  const req = {
    decoded: { 
      adminCircle: true,
    },
  };
  checkAdmin(req, res, next);
  assert.ok(status, 401);
});