const { MISSING_DEPENDENCY, SOMTHING_WENT, JWT_SECRATE, SUCCESS, EMAIL_EXIST, EMAIL_NOT_EXIST, UNUTHORIZED, UNaTHORIZED } = require("../Constants")

const bcrypt = require("bcrypt")

const userModel=require('../Model/UserModel')
const jwt = require("jsonwebtoken")

class UserController {
    async Registretion(req, res) {
        try {
            const {  username, email, password,confirmPassword } = req.body

            if (!username || !email || !password || !confirmPassword) return res.status(400).send({ massege: MISSING_DEPENDENCY })
            if (password !== confirmPassword) {
                return res.render('index', { error: 'Passwords do not match' });
              }

            
            const EnCryptedPassword1 = bcrypt.hashSync(confirmPassword, 8)
            if (!EnCryptedPassword1) return res.status(500).send({ massege: SOMTHING_WENT })

            req.body.confirmPassword = EnCryptedPassword1

            const EnCryptedPassword = bcrypt.hashSync(password, 8)
            if (!EnCryptedPassword) return res.status(500).send({ massege: SOMTHING_WENT })
            req.body.password = EnCryptedPassword

           
           

            const result = await userModel.model.create({ ...req.body })
            if (!result) return res.status(500).send({ massege: SOMTHING_WENT })
            const paylode = { ...result }
            delete paylode.password
            const token = jwt.sign(paylode, JWT_SECRATE, { expiresIn: "1d" })



            if (!token) return res.status(500).send({ massege: SOMTHING_WENT })
            return res.status(200).send({ massege: SUCCESS, token: token })
        } catch (error) {
            if (error.code === 11000) return res.status(400).send({ massege: EMAIL_EXIST })
            return res.status(500).send({ massege: INTRNAL_SERVER })
        }
    }

    async LoginUser(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password) return res.status(400).send({ massege: MISSING_DEPENDENCY })
            const user = await userModel.model.findOne({ email: email })
            if (!user) return res.status(400).send({ massege: EMAIL_NOT_EXIST })
            if (!bcrypt.compareSync(password, user.password)) return res.status(401).send({ massege: UNaTHORIZED })
          
            const paylode = { ...user }
            delete paylode.password
            const token = jwt.sign(paylode, JWT_SECRATE, { expiresIn: "1d" })



            if (!token) return res.status(500).send({ massege: SOMTHING_WENT })
            return res.status(200).send({ massege: SUCCESS, token: token })
        } catch (error) {
            return res.status(500).send({ massege: INTRNAL_SERVER })
        }
    }

}

const userController = new UserController()

module.exports = userController