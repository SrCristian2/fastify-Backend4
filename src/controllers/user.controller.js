import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generarToken.js";
import { response } from "../helpers/response.js";
import { userModel } from "../models/user.model.js";

const userCtrl = {};

userCtrl.register = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      return response(
        reply,
        409,
        false,
        "",
        "el correo ya existe en otro registro"
      );
    }

    const passwordEncrypt = encryptPassword(password);

    const newUser = new userModel({ name, email, password: passwordEncrypt });

    await newUser.save();

    const token = generateToken({ user: newUser._id });

    response(
      reply,
      201,
      true,
      { ...newUser._doc, password: null, token },
      "Usuario creado"
    );
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

userCtrl.login = async (req, reply) => {
  try {
    const { password, email } = req.body;

    const user = await userModel.findOne({ email });

    if (user && user.matchPassword(password)) {
      const token = generateToken({ user: user._id });
      return response(
        reply,
        200,
        true,
        { ...user.toJSON, password: null, token },
        "Bienvenido"
      );
    }

    response(reply, 400, false, "", "email o password incorrectos");
  } catch (error) {
    response(reply, 500, false, "", error.message);
  }
};

export default userCtrl;
