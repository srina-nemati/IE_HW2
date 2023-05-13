const bcrypt = require("bcrypt");
const {User} = require("../../modules/user");
const jwt = require("jsonwebtoken");

module.exports = new (
    class {
        async login(req, res) {
            const {email, password} = req.body;
            const loginEmail = await User.findOne({email})

            if(!loginEmail) {
                return res.status(401).json({message: "NO USER FOUND WITH THIS EMAIL"});
            }

            const passwordChecker = await bcrypt.compare(loginEmail.password, password);

            if(!passwordChecker) {
                return res.status(401).json({message: "WRONG PASSWORD"});
            }

            const token = jwt.sign({ userID: loginEmail._userID }, process.env.JWT_TOKEN, { expiresIn: '1h' });

            jwt.verify(token, 'my-secret-key', (err, decoded) => {
            if (err) {
                // Handle verification error
            } else {
                // Use the decoded payload
            }
})