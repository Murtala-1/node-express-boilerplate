const passport = require("passport");

module.exports = (app) => {
  const details = require("../controllers/details");
  app.get("/account/generate/item/code", details.getDetails);
};
