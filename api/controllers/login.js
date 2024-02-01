const  Admin  = require("../models/admin"); // Make sure to import your User model

function validate(inputString) {
    return inputString !== undefined && inputString.length !== 0;
}

const login = async (req, res) => {
    try {
        const { user_id, user_pass } = req.body;
        console.log(user_id,user_pass)

        if (!validate(user_id) || !validate(user_pass)) {
            return res.status(400).json({ message: "Bad Parameters", success: false });
        }

        const user = await Admin.findOne({ where: { user_id: user_id } });

        if (user) {
            // Assuming the password is stored securely (e.g., hashed), you need to compare it
            // with the user_pass using an appropriate method (e.g., bcrypt.compare).
            // Replace the following line with the appropriate password comparison logic.
            const passwordMatch = user_pass === user.password;

            if (passwordMatch) {
                return res.status(200).json({ message: "Login Success", success: true });
            } else {
                return res.status(401).json({ message: "Password is Incorrect", success: false });
            }
        } else {
            return res.status(404).json({ message: "User not found", success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error, message: "Login failed" });
    }
};

module.exports = {
    login
};
