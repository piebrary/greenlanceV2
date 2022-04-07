const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = (express, config) => {

    const secret = config.SECRET
    const expires_in = config.EXPIRES_IN
    const apiPrefix = config.PREFIX

    express.post(apiPrefix + '/login', (req, res) => {
        passport.authenticate(
        'local',
        { session: false },
        (error, user) => {

            if (error) return res.status(403).send('Unauthorized')
            if (!user) return res.status(404).send('User not found')

            /** This is what ends up in our JWT */
            const payload = {
                _id:user._id,
                expires: Date.now() + expires_in
            }

            /** assigns payload to req.user */
            req.login(payload, { session: false }, error => {

                if (error) return res.status(400).send('Could not login')

                /** generate a signed json web token and return it in the response */
                const token = jwt.sign(JSON.stringify(payload), secret)

                /** assign our jwt to the cookie */
                res.set('jwt', token)

                res.status(200).send('User logged in')

            })

        },

        )(req, res)

    })

}
