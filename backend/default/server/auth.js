const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const bcrypt = require('bcrypt')

module.exports = () => {

    let logger, UserModel

    try {
        logger = require('../../custom/utils/logger')
    } catch {
        logger = require('../../default/utils/logger')
    }

    try {
        UserModel = require('../../custom/models/user')
    } catch {
        UserModel = require('../../default/models/user')
    }

    passport.use(new LocalStrategy(

        async (username, password, done) => {

            const userDocument = await UserModel.findOne({ username: username }).exec()

            if(userDocument){

                try {

                    const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash)

                    if(passwordsMatch){

                        return done(null, userDocument)

                    }

                    return done('Incorrect Password')

                } catch (error) {

                    logger.error({
                        message:'New Error',
                        data:error
                    })

                    return done(error)

                }

            }

            return done('Incorrect username')

        }

    ))

    passport.use(new JWTStrategy({
        jwtFromRequest: req => {

            const token = req.headers.authorization

            if(token){

                return token.slice(7)

            }

            return null

        },
        secretOrKey: process.env.API_SECRET,
    },
        (jwtPayload, done) => {

            if (Date.now() > jwtPayload.expires) {

                return done('jwt expired')

            }

            return done(null, jwtPayload)
        }
    ))

}
