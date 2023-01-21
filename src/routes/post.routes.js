import postCtrl from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";
import { upload } from "../middlewares/imgUpload.js";

const middleware = (req, reply, done) => {
  verifyToken(req, reply, done);
};

export const postRoutes = (fastify, opts, done) => {
  fastify.get("/", { preHandler: [middleware] }, postCtrl.listar);
  fastify.get("/user", { preHandler: [middleware] }, postCtrl.listarPostLogin);
  fastify.get("/:id", { preHandler: [middleware] }, postCtrl.listOne);
  fastify.post(
    "/",
    { preHandler: [middleware, upload.single("img")] },
    postCtrl.add
  );
  fastify.delete("/:id", { preHandler: [middleware] }, postCtrl.delete);
  fastify.put(
    "/:id",
    { preHandler: [middleware, upload.single("img")] },

    postCtrl.update
  );

  done();
};
