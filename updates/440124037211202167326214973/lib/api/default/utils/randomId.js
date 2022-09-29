module.exports = (length = 32) => {

    let id = ''

    for(let i = 0; i < length; i++){

        id += Math.random().toString(36).substr(2, 1)

    }

    return id

}
