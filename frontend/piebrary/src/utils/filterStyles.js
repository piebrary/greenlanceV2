import { decapitalizeFirstLetter } from './decapitalizeFirstLetter'
import { deepCopy } from './deepCopy'

export function filterStyles(styles, name){

    const resultObj = {}

    for(let style of styles){

        for(let key in style){

            if(key.startsWith(name)){

                const newKey = decapitalizeFirstLetter(key.split(name)[1])

                resultObj[newKey] = deepCopy(style[key])

            }

        }
    }

    return resultObj

}
