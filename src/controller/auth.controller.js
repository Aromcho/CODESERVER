import User from "../DAO/mongo/models/user.model";

// authController
const register = (req, res) => {
    const { name, email, password } = req.body;
    User.create ({
        name,
        email,
        password,
        role,
        photo,
        age
    })

};  