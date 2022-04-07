module.exports = (() => {

    const username = 'dbUser'
    const password = 'DIvmuXWZZ84YiTW4'
    const database = 'PieBrary'
    const url = 'cluster0.ygbd3.mongodb.net'

    const composedURL = `mongodb+srv://${username}:${password}@${url}/${database}`

    return {
        URL:composedURL
    }

})()
