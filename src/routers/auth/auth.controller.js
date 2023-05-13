const bcrypt = require("bcrypt");
const User = require("../../modules/user");
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: '1h',
    }
  );

  return token;
};

module.exports = {
  async login(req, res) {
    const { email, password } = req.validatedData;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email' });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = createToken(user);

      return res.status(200).json({
        user_type: user.user_type,
        user_id: user.first_name,
        email: user.last_name,
        token: token,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};
