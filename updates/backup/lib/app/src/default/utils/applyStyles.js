import { decapitalizeFirstLetter } from './decapitalizeFirstLetter'
import { deepCopy } from './deepCopy'

export function applyStyles(styles, names){

    const resultObj = {}

    if(typeof names === 'string'){

        names = [names]

    }

    for(let style of styles){

        for(let key in style){

            for(let name of names){

                const splittedKey = key.split('_')

                if(splittedKey[0] === name){

                    const newKey = decapitalizeFirstLetter(splittedKey.slice(1).join('_'))

                    if(newKey.length > 0){

                        if(resultObj[newKey]) resultObj[newKey].push(deepCopy(style[key]))
                        if(!resultObj[newKey]) resultObj[newKey] = [deepCopy(style[key])]

                    }

                }

            }

        }

    }
    

    return resultObj

}
