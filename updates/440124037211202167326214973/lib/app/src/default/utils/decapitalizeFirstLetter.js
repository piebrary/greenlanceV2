export function decapitalizeFirstLetter(string){

    if(typeof string !== 'string'){

        return undefined

    }

    return string.charAt(0).toLowerCase() + string.slice(1)

}
