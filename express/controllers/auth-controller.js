const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secretKey = "jwt_secret";


exports.login = async (req, res) => {
  const { login, password } = req.body;

  try {
   
    const user = await User.findOne({ where: { login, password } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Login ou mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, fullname: user.fullname },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      message: "Connexion réussie.",
      token,
      fullname: user.fullName,
      login: user.login,
      userId: user.id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur.", error });
  }
};
