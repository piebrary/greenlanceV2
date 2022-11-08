module.exports = obj => {

    for(let prop in obj){

        if(obj[prop] === 'on'){

            return prop

        }

    }

    return undefined

}
