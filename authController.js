const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require("bcryptjs")

class AuthController {
    async registration(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "User already exists"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = await User.create({username, password: hashPassword, roles: [userRole.value]})
            return res.json({message: "User was registered successfully"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) { 
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "User not found"})
            }
            const validPassword = await bcrypt.compare(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: "Invalid password"})
            }
            return res.json(user)
        } catch (e) {
            
        }
    }

    async getUsers(req, res) {
        try {           
            const users = await User.find()
            const adminRole = new Role({value: "ADMIN"})
            const userRole = new Role({value: "USER"})
            await adminRole.save()
            await userRole.save()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Cannot get users"})
        }
    }
}

module.exports = new AuthController();