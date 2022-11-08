module.exports = obj => {

    const result = []

    for(let prop in obj){

        if(obj[prop] === true){

            result.push(prop)

        }

    }

    return result

}
