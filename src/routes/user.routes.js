import userCtrl from "../controllers/user.controller.js";

export const userRoutes = (fastify, opts, done) => {
  fastify.post("/register", userCtrl.register);
  fastify.post("/login", userCtrl.login);

  done();
};
