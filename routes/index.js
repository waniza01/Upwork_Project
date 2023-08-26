const auth = require("./auth");

//endpoints
module.exports = (app) => {
  app.get("/test", (req, res) => {
    res.status(200).send({
      message:
        "Welcome to the AUTHENTICATION API. Register or Login to test Authentication.",
    });
  });

  app.use("/api/auth", auth);
};
